import "core-js/stable";
import "./yearview.css";

export default {
  // static values
  dateAlignment: "year",
  duration: { years: 1 },
  viewClassNames: ["fc-yearview"],

  // content
  content: (args) => {
    const context = calendar.getCurrentData();
    const view = context.viewApi;
    const events = calendar.getEvents();
    const today = new Date();
    const table = document.createElement("table");
    table.classList.add("fc-scrollgrid");

    // loop days
    for (let date = -1; date <= 37; date++) {
      let row;
      if (date == -1)
        row = table.appendChild(document.createElement("colgroup"));
      else row = table.appendChild(document.createElement("tr"));
      const month = new Date(args.dateProfile.renderRange.start.valueOf());
      month.setDate(1);
      while (month.getTime() < args.dateProfile.renderRange.end.getTime()) {
        // offset of month
        const offset = (month.getDay() + 6) % 7;
        const real = new Date(month.valueOf());
        real.setDate(date - offset);

        // colgroups
        if (date == -1) {
          row.appendChild(document.createElement("col")).style.width = "30px";
          row.appendChild(document.createElement("col")).style.minWidth =
            "50px";
        }

        // month header
        else if (date == 0) {
          const cell = row.appendChild(document.createElement("th"));
          cell.colSpan = 2;
          const link = cell
            .appendChild(document.createElement("div"))
            .appendChild(document.createElement("a"));
          link.classList.add("fc-col-header-cell-cushion");
          link.append(month.toLocaleString("de", { month: "long" }));
        }

        // month offset
        else if (month.getMonth() != real.getMonth()) {
          const cell = row.appendChild(document.createElement("th"));
          cell.colSpan = 2;
          cell.classList.add("fc-day-empty");
        }

        // real day
        else {
          const thisDay = new Date(real.valueOf());
          thisDay.setHours(0, 0, 0, 0);
          const nextDay = new Date(thisDay.valueOf());
          nextDay.setDate(nextDay.getDate() + 1);
          const classes = [
            "fc-day-" +
              thisDay
                .toLocaleDateString("en", { weekday: "short" })
                .toLowerCase(),
          ];
          if (
            FullCalendar.rangeContainsMarker(
              { start: thisDay, end: nextDay },
              today
            )
          ) {
            classes.push("fc-day-today");
          }

          // html
          const day = row.appendChild(document.createElement("td"));
          day.classList.add("fc-day", ...classes);
          day.append(
            ("0" + real.getDate()).slice(-2),
            document.createElement("br"),
            real.toLocaleString("de", { weekday: "short" })
          );
          const cell = row.appendChild(document.createElement("td"));
          cell.classList.add("fc-events", ...classes);
          events
            .filter((event) =>
              FullCalendar.rangesIntersect(
                {
                  start: event.start,
                  end:
                    event.end ||
                    context.dateEnv.add(
                      event.start,
                      event.allDay
                        ? view.getOption("defaultAllDayEventDuration")
                        : view.getOption("defaultTimedEventDuration")
                    ),
                },
                { start: thisDay, end: nextDay }
              )
            )
            .map((event) => {
              // event element
              const elem = document.createElement("div");
              elem.style.backgroundColor =
                event.backgroundColor ||
                event.source.internalEventSource.ui.backgroundColor;
              elem.style.borderColor =
                event.borderColor ||
                event.source.internalEventSource.ui.borderColor;
              elem.style.textColor =
                event.textColor ||
                event.source.internalEventSource.ui.textColor;

              // background event
              if (
                [
                  event.display,
                  event.source.internalEventSource.ui.display,
                ].includes("background")
              ) {
                day.appendChild(elem);
                elem.classList.add("fc-bg-event");
                cell.appendChild(elem.cloneNode(true)).append(event.title);
              }

              // normal event
              else {
                cell.appendChild(elem);
                elem.classList.add(
                  "fc-h-event",
                  "fc-event",
                  ...event.classNames,
                  ...event.source.internalEventSource.ui.classNames
                );
                const div = elem.appendChild(document.createElement("div"));
                div.classList.add("fc-event-main");

                // content
                let content =
                  context.calendarOptions.eventContent ||
                  view.getOption("eventContent");
                if (content instanceof Function) {
                  content = content({ event: event, view: view });
                }
                if (typeof content === "string" || content instanceof String) {
                  div.append(content);
                } else if (typeof content === "object" && "html" in content) {
                  div.innerHTML = content.html;
                } else if (
                  typeof content === "object" &&
                  "domNodes" in content
                ) {
                  div.append(...content.domNodes);
                } else {
                  console.warn("unexpected eventContent", content);
                }

                // click event
                if (event.url) elem.style.cursor = "pointer";
                elem.addEventListener("click", (ev) =>
                  context.emitter.trigger("eventClick", {
                    el: ev.target,
                    event: event,
                    jsEvent: ev,
                    view: view,
                  })
                );
              }
            });
        }
        month.setMonth(month.getMonth() + 1);
      }
    }

    return { domNodes: [table] };
  },

  // content of event
  eventContent: (args) => {
    const nodes = [];
    nodes.push(document.createElement("a"));
    nodes.push(document.createTextNode(args.event.title));
    const meta = document.createElement("div");
    meta.classList.add("fc-event-meta");
    nodes.push(meta);

    // event time
    if (!args.event.allDay) {
      const time = meta.appendChild(document.createElement("div"));
      time.classList.add("fc-event-time");
      time.append(
        args.event.start.toLocaleTimeString(
          args.view.getOption("locale") || navigator.language,
          args.view.getOption("eventTimeFormat")?.standardDateProps || {}
        )
      );
    }

    // event location
    if (args.event.extendedProps.location) {
      const location = meta.appendChild(document.createElement("div"));
      location.classList.add("fc-event-location");
      location.append(args.event.extendedProps.location);
    }

    return { domNodes: nodes };
  },
};
