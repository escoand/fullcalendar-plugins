import { createPlugin, EventClickArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal.js";
import ICAL from "ical.js";
import { namespaceResolver, namespaces } from "./common";

type CalDavInteractionConfig = {
  attendee: string;
  organizer: string;
  password: string;
  prompt: string;
  username: string;
};

type EventFindResult = EventImpl & {
  caldav: string;
  caldavUrl: string;
};

class CalDavInteractionPlugin {
  private _config: CalDavInteractionConfig;
  private _calendars: string[] = [];

  constructor(config: CalDavInteractionConfig) {
    this._config = config;
  }

  static build(name: string, config: CalDavInteractionConfig) {
    const cp = new CalDavInteractionPlugin(config);
    return createPlugin({
      name,
      contextInit(context) {
        context.calendarApi.setOption("eventClick", cp._promptTitle.bind(cp));
      },
    });
  }

  private get _auth() {
    return "Basic " + btoa(this._config.username + ":" + this._config.password);
  }

  private _queryCalendars(event: EventImpl) {
    if (Object.keys(this._calendars).length)
      return Promise.resolve(this._calendars);

    const url = new URL(
      `/remote.php/dav/calendars/${this._config.username}/`,
      event.extendedProps.caldavUri
    );

    return fetch(url, {
      method: "PROPFIND",
      headers: { Authorization: this._auth, Depth: "1" },
      body:
        `<d:propfind xmlns:d="${namespaces.d}">` +
        "<d:prop>" +
        "<d:displayname/>" +
        "</d:prop>" +
        "</d:propfind>",
    })
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
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
          const calendarUrl = new URL(uri, url).toString();
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
        headers: { Authorization: this._auth, Depth: "1" },
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
          );
          if (url && caldav) {
            const eventUrl = new URL(url, calendarUrl).toString();
            let idx;
            while ((idx = this._calendars.indexOf(calendarUrl)) >= 0) {
              this._calendars.splice(idx, 1);
            }
            this._calendars.unshift(calendarUrl);
            return Promise.resolve({ ...event, caldav, caldavUrl: eventUrl });
          } else {
            return Promise.reject();
          }
        })
        .catch(search);
    };
    return search();
  }

  private _promptTitle(arg: EventClickArg) {
    if (!this._isEditable(arg.event, "title")) {
      return;
    }
    Promise.allSettled([
      this._queryCalendars(arg.event),
      new Promise<string>((resolve, reject) => {
        const input = prompt(this._config.prompt, arg.event.title);
        input !== null ? resolve(input) : reject();
      }),
    ]).then(([_, name]) => {
      name.status === "fulfilled" &&
        this._findEvent(arg.event).then((event) =>
          this._updateEvent(event, "summary", name.value)
        );
    });
  }

  private _isEditable(event: EventImpl, property: string) {
    return (
      event.display !== "background" &&
      event.extendedProps.caldavUri &&
      (event.extendedProps[`${property.toLowerCase()}Editable`] === true ||
        event.source?.internalEventSource.extendedProps[
          `${property.toLowerCase()}Editable`
        ] === true)
    );
  }

  private _updateEvent(
    event: EventFindResult,
    property: string,
    value: string
  ) {
    const jcal = ICAL.parse(event.caldav);
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
    vprop1?.setParameter("", "TRUE");
    const vprop2 = vevent?.addPropertyWithValue("X-OLD-" + property, prevValue);
    vprop2?.setParameter("MODIFIED", new Date().toISOString());

    return fetch(event.caldavUrl, {
      method: "PUT",
      headers: {
        Authorization: this._auth,
        "Content-Type": "text/calendar",
      },
      body: vcalendar.toString(),
    }).then((response) =>
      response.ok
        ? event.source?.refetch()
        : Promise.reject(
            `unable to update caldav event: ${response.statusText} (${response.status})`
          )
    );
  }
}

const stringVal = (xml: Document, xpath: string) =>
  xml.evaluate(xpath, xml, namespaceResolver, XPathResult.STRING_TYPE)
    .stringValue;

export default (config: CalDavInteractionConfig) =>
  CalDavInteractionPlugin.build("CalDavInteractionPlugin", config);
