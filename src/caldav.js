import "core-js/stable";

// ical helpers
const padNumber = (number, length = 2) => ("000000000" + number).slice(-length);
const icalDate = (date) => {
  return (
    date.getUTCFullYear() +
    padNumber(date.getUTCMonth() + 1) +
    padNumber(date.getUTCDate()) +
    "T" +
    padNumber(date.getUTCHours()) +
    padNumber(date.getUTCMinutes()) +
    padNumber(date.getUTCSeconds()) +
    "Z"
  );
};
const parseIcal = (ical, start, end) => {
  const createEvent = (event, start, end) => {
    const obj = {
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
      end: end ? end.toString() : event.endDate.toString(),
      location: event.location,
      start: start ? start.toString() : event.startDate.toString(),
      title: event.summary,
    };
    if (
      event.description &&
      event.description.match(new RegExp("https?://[^ ]+"))
    ) {
      obj.url = event.description.match(new RegExp("https?://[^ ]+"))[0];
    }
    return obj;
  };

  const jcal = ICAL.parse(ical);
  const comp = new ICAL.Component(jcal);
  return comp.getAllSubcomponents("vevent").flatMap((item) => {
    const result = [];
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

export default function (url) {
  const namespaceResolver = (prefix) =>
    ({
      a: "http://apple.com/ns/ical/",
      c: "urn:ietf:params:xml:ns:caldav",
      d: "DAV:",
      n: "http://nextcloud.com/ns",
    }[prefix] || null);

  const xhrRequest = (
    method,
    url,
    headers = [],
    request,
    successCallback,
    failureCallback,
    doAsync = true
  ) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, doAsync);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 400
        ? successCallback(xhr.response)
        : failureCallback(xhr);
    xhr.onerror = failureCallback;
    headers.forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.send(request);
    return xhr;
  };

  const data = {
    // static values
    editable: false,

    // calendar data
    events: (fetchInfo, successCallback, failureCallback) => {
      xhrRequest(
        "REPORT",
        url,
        [["Depth", "1"]],
        '<calendar-query xmlns="urn:ietf:params:xml:ns:caldav">' +
          '<prop xmlns="DAV:">' +
          '<calendar-data xmlns="urn:ietf:params:xml:ns:caldav"/>' +
          "</prop>" +
          "<filter>" +
          '<comp-filter name="VCALENDAR">' +
          '<comp-filter name="VEVENT">' +
          '<time-range start="' +
          icalDate(fetchInfo.start) +
          '" end="' +
          icalDate(fetchInfo.end) +
          '"/>' +
          "</comp-filter>" +
          "</comp-filter>" +
          "</filter>" +
          "</calendar-query>",
        (response) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(response, "text/xml");
          const iter = xml.evaluate(
            "/d:multistatus/d:response/d:propstat/d:prop/c:calendar-data",
            xml,
            namespaceResolver,
            XPathResult.UNORDERED_NODE_ITERATOR_TYPE
          );
          const events = [];
          let next = iter.iterateNext();
          while (next) {
            events.push(
              parseIcal(next.innerHTML, fetchInfo.start, fetchInfo.end)
            );
            next = iter.iterateNext();
          }
          successCallback(events.flat());
        },
        (xhr) => failureCallback("failed to fetch events", xhr)
      );
    },
  };

  // meta data
  (async () =>
    await new Promise((resolve, reject) =>
      xhrRequest(
        "PROPFIND",
        url,
        [["Depth", 0]],
        '<propfind xmlns="DAV:">' +
          "<prop>" +
          "<displayname/>" +
          '<owner-displayname xmlns="http://nextcloud.com/ns"/>' +
          '<calendar-color xmlns="http://apple.com/ns/ical/"/>' +
          "</prop>" +
          "</propfind>",
        (response) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(response, "text/xml");
          const stringVal = (xpath) =>
            xml.evaluate(
              xpath,
              xml,
              namespaceResolver,
              XPathResult.STRING_TYPE
            );
          const name = stringVal(
            "/d:multistatus/d:response/d:propstat/d:prop/d:displayname"
          );
          const color = stringVal(
            "/d:multistatus/d:response/d:propstat/d:prop/a:calendar-color"
          );
          data.name = name.stringValue;
          data.color = color.stringValue;
          resolve();
        },
        (xhr) => {
          console.error("failed to fetch meta", xhr);
          reject();
        },
        false
      )
    ).catch((err) => console.error("failed to fetch meta", err)))();

  return data;
}
