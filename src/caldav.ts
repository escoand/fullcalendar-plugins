import {
  createPlugin,
  EventApi,
  EventChangeArg,
  EventInput,
} from "@fullcalendar/core";
import {
  CalendarContext,
  DateRange,
  EventSourceDef,
} from "@fullcalendar/core/internal";
import * as ICAL from "ical.js";
import { namespaceResolver, namespaces } from "./common";
import { expandICalEvents, IcalExpander } from "./deps/@fullcalendar/icalendar";

type CalDavMeta = {
  auth?: CalDavAuthProvider;
  url: string;
  format: "caldav";
};

type CalDavConfig = {
  color: string;
  name: string;
};

type CaldavSourceProps = {
  auth?: CalDavAuthProvider;
  calendarHomeUrl?: URL;
  calendars?: URL[];
  principalUrl?: URL;
  sourceUrl?: URL | string;
};

type CaldavEvent = {
  event: EventApi;
  ics: string;
  url: string;
  writable: boolean;
};

const httpUrl = /https?:\/\/\S+/;

const createEvent = (icsText: string, range: DateRange): EventInput => {
  const expander = new IcalExpander({
    ics: icsText,
    skipInvalidDates: true,
  });
  const results = expandICalEvents(expander, range);
  results.forEach((result: EventInput, idx) => {
    result.id = expander.events[idx].uid;
    if (!result.extendedProps) result.extendedProps = {};
    result.extendedProps.attendees = Object.fromEntries(
      expander.events[idx].attendees.map((_) => [
        _.getFirstValue(),
        _.getFirstParameter("partstat"),
      ])
    );
    result.extendedProps.categories =
      expander.events[idx].component
        .getFirstProperty("categories")
        ?.jCal.slice(3) || [];
    result.extendedProps.status =
      expander.events[idx].component.getFirstPropertyValue("status");
    if (expander.events[idx].color) {
      result.color = expander.events[idx].color;
    }
    if (expander.events[idx].description?.search(httpUrl) >= 0) {
      result.url = expander.events[idx].description?.match(httpUrl)?.[0];
    }
  });
  return results;
};

const fetchPropfind = (
  url: URL | string,
  body: string,
  depth = 0,
  auth?: string
) =>
  fetch(url, {
    method: "PROPFIND",
    headers: { Authorization: auth, Depth: depth.toFixed() },
    body:
      `<d:propfind xmlns:a="${namespaces.a}" xmlns:c="${namespaces.c}" xmlns:d="${namespaces.d}">` +
      "<d:prop>" +
      body +
      "</d:prop>" +
      "</d:propfind>",
  })
    .then((response) =>
      response.ok ? response.text() : Promise.reject({ response })
    )
    .then((text) => new DOMParser().parseFromString(text, "text/xml"));

const fetchReport = (
  url: URL | string,
  filter: string,
  auth?: string
): Promise<XPathResult> =>
  fetch(url, {
    method: "REPORT",
    headers: { Authorization: auth, Depth: "1" },
    body:
      `<c:calendar-query xmlns:c="${namespaces.c}" xmlns:d="${namespaces.d}">` +
      "<d:prop>" +
      "<d:current-user-privilege-set/>" +
      "<c:calendar-data/>" +
      "</d:prop>" +
      "<c:filter>" +
      '<c:comp-filter name="VCALENDAR">' +
      '<c:comp-filter name="VEVENT">' +
      filter +
      "</c:comp-filter>" +
      "</c:comp-filter>" +
      "</c:filter>" +
      "</c:calendar-query>",
  })
    .then((response) => response.text())
    .then((text) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const iter = xml.evaluate(
        "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-data",
        xml,
        namespaceResolver,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE
      );
      return iter;
    });

const getConfig = (url: string): Promise<CalDavConfig> =>
  fetchPropfind(
    url,
    "<a:calendar-color/>" +
      "<d:current-user-privilege-set/>" +
      "<d:displayname/>"
  ).then((xml): CalDavConfig => {
    const iter = xml.evaluate(
      "/d:multistatus/d:response/d:propstat",
      xml,
      namespaceResolver
    );
    const node = iter.iterateNext();
    if (!node) return;
    return {
      name: stringVal(xml, "./d:prop/d:displayname", node),
      color: stringVal(xml, "./d:prop/a:calendar-color", node),
    };
  });

const getEventsInRange = (url: URL | string, range: DateRange) =>
  fetchReport(
    url,
    `<c:time-range start="${ICAL.Time.fromJSDate(
      range.start
    ).toICALString()}" end="${ICAL.Time.fromJSDate(
      range.end
    ).toICALString()}"/>`
  ).then((iter: XPathResult) => {
    const result: EventInput[] = [];
    let node: Node | null;
    while ((node = iter.iterateNext())) {
      if (!node.textContent) continue;
      const events = createEvent(node.textContent, range);
      result.push(events);
    }
    return { rawEvents: result.flat() };
  });

const getPrincipal = (props: CaldavSourceProps): Promise<URL> => {
  if (props.principalUrl) {
    return Promise.resolve(props.principalUrl);
  }

  const url = new URL("/remote.php/dav/", props.sourceUrl);

  return fetchPropfind(
    url,
    "<d:current-user-principal/>",
    0,
    props.auth?.getAuth()
  ).then((xml) => {
    const href = stringVal(
      xml,
      "/d:multistatus/d:response/d:propstat/d:prop/d:current-user-principal/d:href"
    );
    props.principalUrl = new URL(href, url);
    return props.principalUrl;
  });
};

const getCalendarHome = (props: CaldavSourceProps): Promise<URL> => {
  if (!props.principalUrl) {
    return Promise.reject();
  } else if (props.calendarHomeUrl) {
    return Promise.resolve(props.calendarHomeUrl);
  }

  return fetchPropfind(
    props.principalUrl,
    "<c:calendar-home-set/>",
    0,
    props.auth?.getAuth()
  ).then((xml) => {
    const href = stringVal(
      xml,
      "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-home-set/d:href"
    );
    props.calendarHomeUrl = new URL(href, props.principalUrl);
    return props.calendarHomeUrl;
  });
};

const getCalendars = (props: CaldavSourceProps): Promise<URL[]> => {
  if (props.calendars?.length) {
    return Promise.resolve(props.calendars);
  } else if (!props.calendarHomeUrl) {
    return Promise.reject();
  }

  return fetchPropfind(
    props.calendarHomeUrl,
    "<d:current-user-privilege-set/>",
    1,
    props.auth?.getAuth()
  ).then((xml) => {
    if (!props.calendars) {
      props.calendars = [];
    }
    const iter = xml.evaluate(
      "/d:multistatus/d:response",
      xml,
      namespaceResolver,
      XPathResult.UNORDERED_NODE_ITERATOR_TYPE
    );
    let node: Node | null;
    while ((node = iter.iterateNext())) {
      const href = stringVal(xml, "./d:href", node);
      const writable = xml.evaluate(
        "boolean(./d:propstat/d:prop/d:current-user-privilege-set/d:privilege/d:write)",
        node,
        namespaceResolver,
        XPathResult.BOOLEAN_TYPE
      ).booleanValue;
      if (writable) {
        props.calendars.push(new URL(href, props.calendarHomeUrl));
      }
    }
    return props.calendars;
  });
};

const getEvent = (
  event: EventApi,
  calendarUrl: URL | string,
  auth?: string
): Promise<CaldavEvent> =>
  fetchReport(
    calendarUrl,
    '<c:prop-filter name="UID">' +
      `<c:text-match collation="i;octet">${event.id}</c:text-match>` +
      "</c:prop-filter>",
    auth
  ).then((iter) => {
    const node = iter.iterateNext();
    const ics = node?.textContent;
    const href =
      node?.parentNode?.parentNode?.parentNode?.querySelector(
        "href"
      )?.textContent;
    const writable =
      node?.ownerDocument?.evaluate(
        "boolean(../d:current-user-privilege-set/d:privilege/d:write)",
        node,
        namespaceResolver,
        XPathResult.BOOLEAN_TYPE
      ).booleanValue || false;
    if (!ics || !href) return Promise.reject();
    const url = new URL(href, calendarUrl).toString();
    return { event, ics, url, writable };
  });

const searchEvent = (
  event: EventApi,
  props: CaldavSourceProps
): Promise<CaldavEvent> => {
  const calendars = JSON.parse(
    JSON.stringify(props.calendars ? props.calendars : [])
  ) as string[];

  const iterate = (): Promise<CaldavEvent> => {
    const calendarUrl = calendars.shift();
    return calendarUrl
      ? getEvent(event, calendarUrl, props.auth?.getAuth())
          .then((result) => {
            const idx = props.calendars?.findIndex(
              (_) => _.toString() === calendarUrl
            );
            if (idx && idx >= 0) {
              props.calendars?.unshift(props.calendars.splice(idx, 1)[0]);
            }
            return result;
          })
          .catch(iterate)
      : Promise.reject("Event not found");
  };

  return iterate();
};

const updateEvent = (event: CaldavEvent): Promise<CaldavEvent> => {
  const jcal = ICAL.parse(event.ics);
  const vcalendar = new ICAL.Component(jcal);

  vcalendar.getAllSubcomponents("vevent").forEach((raw: string) => {
    const vevent = new ICAL.Event(raw);
    const startDate = ICAL.Time.fromJSDate(event.event.start);
    const endDate = ICAL.Time.fromJSDate(event.event.end);
    if (event.event.allDay) {
      startDate.isDate = true;
      endDate.isDate = true;
    }
    vevent.startDate = startDate;
    vevent.endDate = endDate;
    vevent.summary = event.event.title;
  });

  event.ics = vcalendar.toString();
  return Promise.resolve(event);
};

const saveEvent = (event: CaldavEvent, props: CaldavSourceProps) => {
  return fetch(event.url, {
    method: "PUT",
    headers: {
      Authorization: props.auth?.getAuth(),
      "Content-Type": "text/calendar",
    },
    body: event.ics,
  }).then((response) => {
    if (response.ok) {
      event.event.source?.refetch();
    } else {
      return Promise.reject(
        `unable to update caldav event: ${response.statusText} (${response.status})`
      );
    }
  });
};

const stringVal = (xml: Document, xpath: string, node?: Node) =>
  xml.evaluate(xpath, node || xml, namespaceResolver, XPathResult.STRING_TYPE)
    .stringValue;

const onEventChange = (arg: EventChangeArg) => {
  const props = arg.event.source?.internalEventSource
    .extendedProps as CaldavSourceProps;
  props.sourceUrl = arg.event.source?.url;

  (props.auth
    ? getPrincipal(props)
        .then(() => getCalendarHome(props))
        .then(() => getCalendars(props))
        .then(() => searchEvent(arg.event, props))
    : getEvent(arg.event, arg.event.source?.url as string)
  )
    .then((event) => {
      if (event.writable !== true) {
        arg.revert();
        throw "Event is not writable";
      } else {
        return event;
      }
    })
    .then(updateEvent)
    .then((event) => saveEvent(event, props))
    .catch((error) => {
      arg.revert();
      if (error && error.response) {
        if (error.response.status === 401) {
          if (!props.auth) {
            throw "Needs login but no authentication provider defined";
          } else {
            return props.auth.startLogin();
          }
        } else if (error.response.status === 403) {
          throw "Permission denied";
        }
      }
      throw error;
    });
};

const sourceDef: EventSourceDef<CalDavMeta> = {
  parseMeta(refined) {
    if (!refined.url) throw new Error("url not set");
    return { url: refined.url, format: "caldav" };
  },
  fetch(arg, successCallback, errorCallback) {
    const src = arg.eventSource;
    // fetch config, if not disabled or already done
    if (
      !src.extendedProps.fetchConfig ||
      src.extendedProps.fetchConfig === true
    ) {
      src.extendedProps.fetchConfig = "done";
      getConfig(src.meta.url)
        .then((config) => {
          if (!src.extendedProps.name) {
            src.extendedProps.name = config.name;
          }
          if (!src.ui.backgroundColor && !src.ui.borderColor) {
            src.ui.backgroundColor = config.color;
            src.ui.borderColor = config.color;
          }
          return getEventsInRange(src.meta.url, arg.range);
        })
        .then(successCallback)
        .catch(errorCallback);
    }
    // fetch data directly
    else {
      getEventsInRange(src.meta.url, arg.range)
        .then(successCallback)
        .catch(errorCallback);
    }
  },
};

export default createPlugin({
  name: "CalDavPlugin",
  eventSourceDefs: [sourceDef],
  contextInit: (context: CalendarContext) =>
    context.calendarApi.setOption("eventChange", onEventChange),
});
