import { createPlugin, EventClickArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal.js";
import ICAL from "ical.js";
import { namespaceResolver, namespaces } from "./common";

type CalDavInteractionConfig = {
  attendee: string;
  organizer: string;
  prompt: string;
};

type EventFindResult = {
  caldav: string;
  caldavUrl: string;
  event: EventImpl;
};

class CalDavInteractionPlugin {
  private _config: CalDavInteractionConfig;
  private _principal?: string;
  private _username?: string;
  private _calendarHome?: string;
  private _calendars: string[] = [];
  private _authProvider?: CalDavAuthProvider;

  constructor(config: CalDavInteractionConfig) {
    this._config = config;
  }

  static build(name: string, config: CalDavInteractionConfig) {
    const cp = new CalDavInteractionPlugin(config);
    const plugin = createPlugin({
      name,
      contextInit(context) {
        context.calendarApi.setOption("eventClick", cp._promptTitle.bind(cp));
      },
    });
    plugin.setAuthProvider = cp.setAuthProvider.bind(cp);
    return plugin;
  }

  setAuthProvider(authProvider: CalDavAuthProvider) {
    this._authProvider = authProvider;
  }

  private _getAuth() {
    return this._authProvider?.getAuth() || "";
  }

  private _fetchPropfind(event: EventImpl, uri: string, body: string) {
    const url = new URL(uri, event.source?.url);

    return fetch(url, {
      method: "PROPFIND",
      headers: { Authorization: this._getAuth(), Depth: "1" },
      body:
        `<d:propfind xmlns:c="${namespaces.c}" xmlns:d="${namespaces.d}">` +
        "<d:prop>" +
        body +
        "</d:prop>" +
        "</d:propfind>",
    })
      .then((res) =>
        res.ok
          ? res.text()
          : Promise.reject("error " + res.status + ": " + res.statusText)
      )
      .then((text) => new DOMParser().parseFromString(text, "text/xml"));
  }

  private _queryPrinicpal(event: EventImpl) {
    if (this._principal) {
      return Promise.resolve(this._principal);
    }

    return this._fetchPropfind(
      event,
      "/remote.php/dav/",
      "<d:current-user-principal/>"
    ).then((xml) => {
      this._principal = stringVal(
        xml,
        "/d:multistatus/d:response/d:propstat/d:prop/d:current-user-principal/d:href"
      );
      return this._principal;
    });
  }

  private _queryCalendarHome(event: EventImpl) {
    if (this._calendarHome) {
      return Promise.resolve(this._calendarHome);
    } else if (!this._principal) {
      return Promise.reject();
    }

    return this._fetchPropfind(
      event,
      this._principal,
      "<c:calendar-home-set/><d:displayname/>"
    ).then((xml) => {
      this._calendarHome = stringVal(
        xml,
        "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-home-set/d:href"
      );
      this._username = stringVal(
        xml,
        "/d:multistatus/d:response/d:propstat/d:prop/d:displayname"
      );
      return this._calendarHome;
    });
  }

  private _queryCalendars(event: EventImpl) {
    if (Object.keys(this._calendars).length) {
      return Promise.resolve(this._calendars);
    } else if (!this._calendarHome) {
      return Promise.reject();
    }

    return this._fetchPropfind(
      event,
      this._calendarHome,
      "<d:displayname/>"
    ).then((xml) => {
      const iter = xml.evaluate(
        "/d:multistatus/d:response/d:propstat/d:prop/d:displayname",
        xml,
        namespaceResolver,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE
      );
      let node: Node | null;
      while ((node = iter.iterateNext())) {
        if (!node.textContent) continue;
        const uri = node.parentNode?.parentNode?.parentNode?.querySelector(
          "href"
        )?.textContent as string;
        const calendarUrl = new URL(uri, event.source?.url).toString();
        this._calendars.push(calendarUrl);
      }
      return this._calendars;
    });
  }

  private _findEvent(event: EventImpl) {
    const calendars = JSON.parse(JSON.stringify(this._calendars)) as string[];
    const search = (): Promise<EventFindResult> => {
      const calendarUrl = calendars.shift();
      if (!calendarUrl) return Promise.reject();

      return fetch(calendarUrl, {
        method: "REPORT",
        headers: { Authorization: this._getAuth(), Depth: "1" },
        body:
          `<c:calendar-query xmlns:c="${namespaces.c}" xmlns:d="${namespaces.d}">` +
          "<d:prop>" +
          "<c:calendar-data/>" +
          "</d:prop>" +
          "<c:filter>" +
          '<c:comp-filter name="VCALENDAR">' +
          '<c:comp-filter name="VEVENT">' +
          '<c:prop-filter name="UID">' +
          `<c:text-match collation="i;octet">${event.id}</c:text-match>` +
          "</c:prop-filter>" +
          "</c:comp-filter>" +
          "</c:comp-filter>" +
          "</c:filter>" +
          "</c:calendar-query>",
      })
        .then((response) => (response.ok ? response.text() : Promise.reject()))
        .then((text) => {
          const xml = new DOMParser().parseFromString(text, "text/xml");
          const url = stringVal(xml, "/d:multistatus/d:response/d:href");
          const caldav = stringVal(
            xml,
            "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-data"
          )?.replace(/;=TRUE([;:])/, "$1");
          if (url && caldav) {
            const eventUrl = new URL(url, calendarUrl).toString();
            let idx;
            while ((idx = this._calendars.indexOf(calendarUrl)) >= 0) {
              this._calendars.splice(idx, 1);
            }
            this._calendars.unshift(calendarUrl);
            return Promise.resolve({
              caldav,
              caldavUrl: eventUrl,
              event,
            } as EventFindResult);
          } else {
            return Promise.reject();
          }
        })
        .catch(search);
    };
    return search();
  }

  private _login() {
    if (
      confirm(
        "Um zu bearbeiten musst du angemeldet sein. Du wirst weitergeleitet."
      )
    )
      this._authProvider.startLogin();
  }

  private _promptTitle(arg: EventClickArg) {
    if (!this._isEditable(arg.event, "title")) {
      return;
    } else if (this._authProvider && !this._authProvider?.isLoggedIn()) {
      return this._login();
    }
    // principal
    this._queryPrinicpal(arg.event)
      // calendar home
      .then(() => this._queryCalendarHome(arg.event))
      // calendars
      .then(() =>
        Promise.allSettled([
          this._queryCalendars(arg.event),
          new Promise<string>((resolve, reject) => {
            const input = prompt(this._config.prompt, arg.event.title);
            input !== null ? resolve(input) : reject();
          }),
        ])
      )
      .then(([_, name]) => {
        name.status === "fulfilled" &&
          this._findEvent(arg.event)
            .then((event) => this._updateEvent(event, "summary", name.value))
            .catch(() => console.warn("event not found", arg.event));
      })
      .catch(() => this._login());
  }

  private _isEditable(event: EventImpl, property: string) {
    return (
      event.display !== "background" &&
      (event.extendedProps[`${property.toLowerCase()}Editable`] === true ||
        event.source?.internalEventSource.extendedProps[
          `${property.toLowerCase()}Editable`
        ] === true)
    );
  }

  private _updateEvent(
    findResult: EventFindResult,
    property: string,
    value: string
  ) {
    const jcal = ICAL.parse(findResult.caldav);
    const vcalendar = new ICAL.Component(jcal);
    const vevent = vcalendar.getFirstSubcomponent("vevent");
    const prevValue = vevent?.getFirstPropertyValue(property);
    vevent?.removeAllProperties(property.toLowerCase());
    vevent?.removeAllProperties("organizer");
    vevent?.removeAllProperties("attendee");
    vevent?.addPropertyWithValue(property, value);
    vevent?.addPropertyWithValue("ORGANIZER", this._config.organizer);
    const vprop1 = vevent?.addPropertyWithValue(
      "ATTENDEE",
      this._config.attendee
    );
    vprop1?.setParameter("PARTSTAT", "NEEDS-ACTION");
    vprop1?.setParameter("ROLE", "REQ-PARTICIPANT");
    vprop1?.setParameter("RSVP", "TRUE");
    const vprop2 = vevent?.addPropertyWithValue("X-OLD-" + property, prevValue);
    vprop2?.setParameter("MODIFIED", new Date().toISOString());

    return fetch(findResult.caldavUrl, {
      method: "PUT",
      headers: {
        Authorization: this._getAuth(),
        "Content-Type": "text/calendar",
      },
      body: vcalendar.toString(),
    })
      .then((response) => {
        response.ok
          ? findResult.event.source?.refetch()
          : Promise.reject(
              `unable to update caldav event: ${response.statusText} (${response.status})`
            );
      })
      .catch(console.error);
  }
}

const stringVal = (xml: Document, xpath: string) =>
  xml.evaluate(xpath, xml, namespaceResolver, XPathResult.STRING_TYPE)
    .stringValue;

export default (config: CalDavInteractionConfig) =>
  CalDavInteractionPlugin.build("CalDavInteractionPlugin", config);
