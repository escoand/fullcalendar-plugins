import crypto from "node:crypto";
import fs from "node:fs";

const basicIsoDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

const icalEvent = (id, start, end, summary) => `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${basicIsoDate(start)}
UID:${id}
SUMMARY:${summary}
LOCATION:Test Location
DESCRIPTION:Test Description
DTSTART${
  start.toTimeString().startsWith("00:00:00")
    ? ";VALUE=DATE:" + basicIsoDate(start).substr(0, 8)
    : ":" + basicIsoDate(start)
}
DTEND${
  end.toTimeString().startsWith("00:00:00")
    ? ";VALUE=DATE:" + basicIsoDate(end).substr(0, 8)
    : ":" + basicIsoDate(end)
}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

const reportEntry = (start, end, summary) => {
  const id = crypto.randomUUID();
  return `<d:response>
    <d:href>/caldav/${id}.ics</d:href>
      <d:propstat>
        <d:prop>
          <cal:calendar-data>${icalEvent(
            id,
            start,
            end,
            summary
          )}</cal:calendar-data>
        </d:prop>
        <d:status>HTTP/1.1 200 OK</d:status>
      </d:propstat>
    </d:response>`;
};

const report = `<?xml version="1.0"?>
  <d:multistatus xmlns:d="DAV:" xmlns:cal="urn:ietf:params:xml:ns:caldav">
  ${reportEntry(
    new Date(),
    new Date(Date.now() + 60 * 60 * 1000),
    "Test Today"
  )}
  ${reportEntry(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    new Date(Date.now() + 25 + 60 * 60 * 1000),
    ""
  )}
  ${reportEntry(
    new Date(new Date().toDateString() + " 00:00:00"),
    new Date(
      new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString() + " 00:00:00"
    ),
    "Test Full Day"
  )}
  </d:multistatus>`;

export default (server) => {
  const upstream = server.listeners("request").pop();
  server.removeAllListeners("request").addListener("request", (req, res) => {
    // calendar options
    if (req.method === "PROPFIND") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/xml");
      res.end(fs.readFileSync("demo/propfind.xml"));
    }
    // calendar entries
    else if (req.method === "REPORT") {
      req.body
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Controll-Allow-Origin", "*");
      res.end(report);
    }
    // fallback
    else {
      return upstream(req, res);
    }
  });
};
