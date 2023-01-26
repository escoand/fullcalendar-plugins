import {
  CalendarApi,
  EventInput,
  EventSourceInput,
  createPlugin,
} from "@fullcalendar/core";
import { EventSourceDef } from "@fullcalendar/core/internal";
import "core-js/stable";
import * as ICAL from "ical.js";

interface CalDavMeta {
  url: string;
  format: "caldav";
}

const httpUrl = /https?:\/\/\S+/;

const namespaceResolver = (prefix: string): string | null =>
  ({
    a: "http://apple.com/ns/ical/",
    c: "urn:ietf:params:xml:ns:caldav",
    d: "DAV:",
    n: "http://nextcloud.com/ns",
  }[prefix] || null);

const parseIcal = (ical: string, start: Date, end: Date): EventInput[] => {
  const jcal = ICAL.parse(ical);
  const comp = new ICAL.Component(jcal);
  return comp.getAllSubcomponents("vevent").flatMap((item) => {
    const result: EventInput[] = [];
    const event = new ICAL.Event(item);
    if (event.isRecurring()) {
      const _start = new ICAL.Time().fromJSDate(start);
      const _end = new ICAL.Time().fromJSDate(end);
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
  start: Date = null,
  end: Date = null
): EventInput =>
  Object.assign(
    {
      classNames: []
        .concat(
          (
            (event.description && event.description.match(/#[a-zA-Z0-9]+/g)) ||
            []
          ).map((item) => `category-${item.substr(1)}`)
        )
        .concat(
          (event._firstProp("status") && [
            `status-${event._firstProp("status").toLowerCase()}`,
          ]) ||
            []
        ),
      description: event.description,
      end: end?.toString() || event.endDate.toString(),
      location: event.location,
      start: start?.toString() || event.startDate.toString(),
      title: event.summary,
    },
    event.description?.search(httpUrl) >= 0 && {
      url: event.description.match(httpUrl)[0],
    }
  );

const sourceDef: EventSourceDef<CalDavMeta> = {
  parseMeta(refined) {
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
        ICAL.Time.fromJSDate(arg.range.start).toICALString() +
        '" end="' +
        ICAL.Time.fromJSDate(arg.range.end).toICALString() +
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
          let next = iter.iterateNext();
          while (next) {
            events.push(
              parseIcal(next.textContent, arg.range.start, arg.range.end)
            );
            next = iter.iterateNext();
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
  cal.trigger("loading", true);
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

const pluginDef = createPlugin({
  name: "CalDavPlugin",
  eventSourceDefs: [sourceDef],
});
// @ts-expect-error
pluginDef.initSourceAsync = initSourceAsync;

export default pluginDef;
