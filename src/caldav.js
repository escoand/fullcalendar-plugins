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
      let next;
      while ((next = iter.next()) && next.compare(_end) <= 0) {
        if (next.compare(_start) >= 0) {
          const occ = event.getOccurrenceDetails(next);
          result.push(createEvent(occ.item, occ.startDate, occ.endDate));
        }
      }
    } else if (!event.isRecurrenceException()) {
      result.push(createEvent(event));
    }
    return result;
  });
};

export default (url) => {
  return (fetchInfo, successCallback, failureCallback) => {
    const caldavNS = "urn:ietf:params:xml:ns:caldav";

    // create caldav request
    const doc = document.implementation.createDocument(
      caldavNS,
      "cd:calendar-query"
    );
    doc.documentElement
      .appendChild(doc.createElementNS("DAV:", "prop"))
      .appendChild(doc.createElement("cd:calendar-data"));
    const vcal = doc.documentElement
      .appendChild(doc.createElement("cd:filter"))
      .appendChild(doc.createElement("cd:comp-filter"));
    vcal.setAttribute("name", "VCALENDAR");
    const vevt = vcal.appendChild(doc.createElement("cd:comp-filter"));
    vevt.setAttribute("name", "VEVENT");
    const range = vevt.appendChild(doc.createElement("cd:time-range"));
    range.setAttribute("start", icalDate(fetchInfo.start));
    range.setAttribute("end", icalDate(fetchInfo.end));
    const xml = new XMLSerializer().serializeToString(doc);

    // do request
    const xhr = new XMLHttpRequest();
    xhr.open("REPORT", url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xhr.response, "text/xml");
        const items = xml.getElementsByTagNameNS(caldavNS, "calendar-data");
        const events = Array.from(items).flatMap((item) =>
          parseIcal(item.innerHTML, fetchInfo.start, fetchInfo.end)
        );
        successCallback(events);
      } else {
        failureCallback("failed to fetch", xhr);
      }
    };
    xhr.onerror = () => failureCallback("failed to fetch", xhr);
    xhr.setRequestHeader("Depth", "1");
    xhr.send(xml);
  };
};
