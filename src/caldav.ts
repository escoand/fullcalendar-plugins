import {
  CalendarApi,
  EventInput,
  EventSourceInput,
  createPlugin,
} from "@fullcalendar/core";
import { DateRange, EventSourceDef } from "@fullcalendar/core/internal";
import "core-js/stable";
import ICAL from "ical.js";

type CalDavMeta = {
  url: string;
  format: "caldav";
};

type CalDavConfig = {
  name: string;
  color: string;
};

// from @fullcalendar/core/internal-common.d.ts
type EventSourceFetcherRes = {
  rawEvents: EventInput[];
  response?: Response;
};

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

const fetchConfig = (url: string): Promise<CalDavConfig> =>
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
  })
    .then((response) => response.text())
    .then((text): CalDavConfig => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const stringVal = (xpath: string) =>
        xml.evaluate(xpath, xml, namespaceResolver, XPathResult.STRING_TYPE)
          .stringValue;
      return {
        name: stringVal(
          "/d:multistatus/d:response/d:propstat/d:prop/d:displayname"
        ),
        color: stringVal(
          "/d:multistatus/d:response/d:propstat/d:prop/a:calendar-color"
        ),
      };
    });

const fetchData = (
  url: string,
  range: DateRange
): Promise<EventSourceFetcherRes> =>
  fetch(url, {
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
      basicIsoDate(range.start) +
      '" end="' +
      basicIsoDate(range.end) +
      '"/>' +
      "</comp-filter>" +
      "</comp-filter>" +
      "</filter>" +
      "</calendar-query>",
  })
    .then((response) => response.text())
    .then((text): EventSourceFetcherRes => {
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
          events.push(parseIcal(node.textContent, range.start, range.end));
      }
      return { rawEvents: events.flat() };
    });

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
      fetchConfig(src.meta.url)
        .then((config) => {
          if (!src.extendedProps.name) {
            src.extendedProps.name = config.name;
          }
          if (!src.ui.backgroundColor && !src.ui.borderColor) {
            src.ui.backgroundColor = config.color;
            src.ui.borderColor = config.color;
          }
          return fetchData(src.meta.url, arg.range);
        })
        .then(successCallback)
        .catch(errorCallback);
    }
    // fetch data directly
    else {
      fetchData(src.meta.url, arg.range)
        .then(successCallback)
        .catch(errorCallback);
    }
  },
};

const initSourceAsync = (
  cal: CalendarApi,
  url: string,
  custom?: EventSourceInput
) => {
  console.warn(
    "[CalDavPlugin]",
    "The method CalDavPlugin.initSourceAsync is deprecated, CalDav config is now also fetched when added with the default way."
  );
  fetchConfig(url).then((config) => {
    const refined = Object.assign(config, custom, { url, format: "caldav" });
    cal.addEventSource(refined);
  });
};

export default Object.assign(
  createPlugin({
    name: "CalDavPlugin",
    eventSourceDefs: [sourceDef],
  }),
  { initSourceAsync }
);
