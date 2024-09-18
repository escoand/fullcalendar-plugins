import {
  CalendarApi,
  EventInput,
  EventSourceInput,
  createPlugin,
} from "@fullcalendar/core";
import { EventSourceDef } from "@fullcalendar/core/internal";
import "core-js/stable";
import ICAL from "ical.js";

interface CalDavMeta {
  url: string;
  format: "caldav";
}

const httpUrl = /https?:\/\/\S+/;

const namespaceResolver: XPathNSResolver = (prefix) =>
  (prefix &&
    {
      a: "http://apple.com/ns/ical/",
      c: "urn:ietf:params:xml:ns:caldav",
      d: "DAV:",
      n: "http://nextcloud.com/ns",
    }[prefix]) ||
  null;

const basicIsoDate = (date: Date): string =>
  date.toISOString().replace(/-|:|\.\d\d\d/g, "");

const parseIcal = (ical: string, start: Date, end: Date): EventInput[] => {
  const jcal = ICAL.parse(ical);
  const comp = new ICAL.Component(jcal);
  return comp.getAllSubcomponents("vevent").flatMap((item) => {
    const result: EventInput[] = [];
    const event = new ICAL.Event(item);
    if (event.isRecurring()) {
      const _start = ICAL.Time.fromJSDate(start);
      const _end = ICAL.Time.fromJSDate(end);
      const iter = event.iterator();
      let next = iter.next();
      while (next && next.compare(_end) <= 0) {
        if (next.compare(_start) >= 0) {
          const occ = event.getOccurrenceDetails(next);
          result.push(createEvent(occ.item, occ.startDate, occ.endDate));
        }
        next = iter.next();
      }
    } else if (!event.isRecurrenceException()) {
      result.push(createEvent(event));
    }
    return result;
  });
};

const createEvent = (
  event: ICAL.Event,
  start?: ICAL.Time,
  end?: ICAL.Time
): EventInput =>
  Object.assign(
    {
      end: end?.toString() || event.endDate.toString(),
      start: start?.toString() || event.startDate.toString(),
      title: event.summary,
      extendedProperties: {
        categories:
          event.component.getFirstProperty("categories")?.jCal.slice(3) || [],
        description: event.description,
        location: event.location,
        organizer: event.organizer,
        status: event.component.getFirstPropertyValue("status"),
      },
    },
    event.color && { color: event.color },
    event.description?.search(httpUrl) >= 0 && {
      url: event.description?.match(httpUrl)?.[0],
    }
  );

const sourceDef: EventSourceDef<CalDavMeta> = {
  parseMeta(refined) {
    if (!refined.url) throw new Error("url not set");
    return { url: refined.url, format: "caldav" };
  },
  fetch(arg, successCallback, errorCallback) {
    fetch(arg.eventSource.meta.url, {
      method: "REPORT",
      headers: [["Depth", "1"]],
      body:
        '<calendar-query xmlns="urn:ietf:params:xml:ns:caldav">' +
        '<prop xmlns="DAV:">' +
        '<calendar-data xmlns="urn:ietf:params:xml:ns:caldav"/>' +
        "</prop>" +
        "<filter>" +
        '<comp-filter name="VCALENDAR">' +
        '<comp-filter name="VEVENT">' +
        '<time-range start="' +
        basicIsoDate(arg.range.start) +
        '" end="' +
        basicIsoDate(arg.range.end) +
        '"/>' +
        "</comp-filter>" +
        "</comp-filter>" +
        "</filter>" +
        "</calendar-query>",
    })
      .then((response) =>
        response.text().then((text) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "text/xml");
          const iter = xml.evaluate(
            "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-data",
            xml,
            namespaceResolver,
            XPathResult.UNORDERED_NODE_ITERATOR_TYPE
          );
          const events: EventInput[] = [];
          let node: Node | null;
          while ((node = iter.iterateNext())) {
            node.textContent &&
              events.push(
                parseIcal(node.textContent, arg.range.start, arg.range.end)
              );
          }
          successCallback({ response, rawEvents: events.flat() });
        })
      )
      .catch(errorCallback);
  },
};

const initSourceAsync = (
  cal: CalendarApi,
  url: string,
  custom?: EventSourceInput
) => {
  fetch(url, {
    method: "PROPFIND",
    headers: [["Depth", "0"]],
    body:
      '<propfind xmlns="DAV:">' +
      "<prop>" +
      "<displayname/>" +
      '<calendar-color xmlns="http://apple.com/ns/ical/"/>' +
      "</prop>" +
      "</propfind>",
  }).then((response) =>
    response.text().then((text) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const stringVal = (xpath: string) =>
        xml.evaluate(xpath, xml, namespaceResolver, XPathResult.STRING_TYPE)
          .stringValue;
      const source: EventSourceInput = Object.assign(
        {
          color: stringVal(
            "/d:multistatus/d:response/d:propstat/d:prop/a:calendar-color"
          ),
          format: "caldav",
          name: stringVal(
            "/d:multistatus/d:response/d:propstat/d:prop/d:displayname"
          ),
          url,
        },
        custom
      );
      cal.addEventSource(source);
    })
  );
};

export default Object.assign(
  createPlugin({
    name: "CalDavPlugin",
    eventSourceDefs: [sourceDef],
  }),
  { initSourceAsync }
);
