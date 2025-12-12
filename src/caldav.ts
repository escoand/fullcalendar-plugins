import { createPlugin, EventInput } from "@fullcalendar/core";
import { DateRange, EventSourceDef } from "@fullcalendar/core/internal";
import {
  expandICalEvents,
  IcalExpander,
} from "../deps/@fullcalendar/icalendar";
import { namespaceResolver, namespaces } from "./common";

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

const basicIsoDate = (date: Date): string =>
  date.toISOString().replace(/-|:|\.\d\d\d/g, "");

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

const fetchConfig = (url: string): Promise<CalDavConfig> =>
  fetch(url, {
    method: "PROPFIND",
    headers: { Depth: "0" },
    body:
      `<d:propfind xmlns:a="${namespaces.a}" xmlns:d="${namespaces.d}">` +
      "<d:prop>" +
      "<d:displayname/>" +
      `<a:calendar-color/>` +
      "</d:prop>" +
      "</d:propfind>",
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
    headers: { Depth: "1" },
    body:
      `<c:calendar-query xmlns:c="${namespaces.c}" xmlns:d="${namespaces.d}">` +
      `<d:prop>` +
      `<c:calendar-data/>` +
      "</d:prop>" +
      "<c:filter>" +
      '<c:comp-filter name="VCALENDAR">' +
      '<c:comp-filter name="VEVENT">' +
      `<c:time-range start="${basicIsoDate(range.start)}" end="${basicIsoDate(
        range.end
      )}"/>` +
      "</c:comp-filter>" +
      "</c:comp-filter>" +
      "</c:filter>" +
      "</c:calendar-query>",
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
        if (!node.textContent) continue;
        events.push(createEvent(node.textContent, range));
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

export default createPlugin({
  name: "CalDavPlugin",
  eventSourceDefs: [sourceDef],
});
