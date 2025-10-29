import { createPlugin, EventClickArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal.js";
import ICAL from "ical.js";

const claim = (
  event: EventImpl,
  config: { auth: string; organizer: string; attendee: string }
) => {
  const uri = event.extendedProps.uri;
  if (!uri) return;

  const name = prompt("Wer \u00fcbernimmt diese Aufgabe?");
  if (!name) return;

  fetch(uri, {
    method: "GET",
    headers: { Authorization: config.auth },
  })
    .then((response) =>
      response.ok
        ? response.text()
        : Promise.reject(
            `unable to request caldav event: ${response.statusText} (${response.status})`
          )
    )
    .then((existingIcs) => {
      const jcal = ICAL.parse(existingIcs);
      const vcalendar = new ICAL.Component(jcal);
      const vevent = vcalendar.getFirstSubcomponent("vevent");
      vevent?.removeAllProperties("summary");
      vevent?.removeAllProperties("organizer");
      vevent?.removeAllProperties("attendee");
      vevent?.addPropertyWithValue("SUMMARY", name);
      vevent?.addPropertyWithValue("ORGANIZER", config.organizer);
      const vprop = vevent?.addPropertyWithValue("ATTENDEE", config.attendee);
      vprop?.setParameter("PARTSTAT", "NEEDS-ACTION");
      vprop?.setParameter("ROLE", "REQ-PARTICIPANT");
      vprop?.setParameter("RSVP", "TRUE");
      const newIcs = vcalendar.toString();
      return fetch(uri, {
        method: "PUT",
        headers: {
          Authorization: config.auth,
          "Content-Type": "text/calendar",
        },
        body: newIcs,
      });
    })
    .then((response) =>
      response.ok
        ? event.source?.refetch()
        : Promise.reject(
            `unable to update caldav event: ${response.statusText} (${response.status})`
          )
    )
    .catch(console.error);
};

const create = (auth: string, organizer: string, attendee: string) =>
  createPlugin({
    name: "ClaimPlugin",
    contextInit(context) {
      context.calendarApi.setOption("eventClick", (arg: EventClickArg) => {
        if (arg.event.display !== "background" && !arg.event.title)
          claim(arg.event, { auth, organizer, attendee });
      });
    },
  });

export default create;
