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
    const event = new ICAL.Event(item);
    if (event.isRecurring()) {
      const result = [];
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
      return result;
    } else if (!event.isRecurrenceException()) {
      return [createEvent(event)];
    } else {
      return [];
    }
  });
};

export default (url, props = {}) => {
  return Object.assign(props, {
    events: (fetchInfo, successCallback, failureCallback) => {
      const xhr = new XMLHttpRequest();
      xhr.open("REPORT", url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
          const parser = new DOMParser();
          const xml = parser.parseFromString(xhr.response, "text/xml");
          const items = xml.getElementsByTagName("cal:calendar-data");
          const events = [];
          for (let i = 0; i < items.length; i++) {
            events.push(
              ...parseIcal(items[i].innerHTML, fetchInfo.start, fetchInfo.end)
            );
          }
          successCallback(events);
        } else {
          failureCallback("failed to fetch", xhr);
        }
      };
      xhr.onerror = () => failureCallback("failed to fetch", xhr);
      xhr.setRequestHeader("Depth", "1");
      xhr.send(
        '<?xml version="1.0" encoding="utf-8" ?>' +
          '<x1:calendar-query xmlns:x1="urn:ietf:params:xml:ns:caldav">' +
          '<x0:prop xmlns:x0="DAV:">' +
          "<x1:calendar-data/>" +
          "</x0:prop>" +
          "<x1:filter>" +
          '<x1:comp-filter name="VCALENDAR">' +
          '<x1:comp-filter name="VEVENT">' +
          "<x1:time-range " +
          'start="' +
          icalDate(fetchInfo.start) +
          '" ' +
          'end="' +
          icalDate(fetchInfo.end) +
          '"/>' +
          "</x1:comp-filter>" +
          "</x1:comp-filter>" +
          "</x1:filter>" +
          "</x1:calendar-query>"
      );
    },
  });
};
