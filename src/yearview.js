import "core-js/stable";

export default {
  // date range
  dateAlignment: "year",
  duration: { years: 1 },

  // content
  content: (args) => {
    const today = new Date();
    const events = calendar?.getEvents() || [];
    const options = calendar?.getCurrentData()?.options || {};
    const end = args.dateProfile.renderRange.end;
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
      while (month.getTime() < end.getTime()) {
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
          link.appendChild(
            document.createTextNode(
              month.toLocaleString("de", { month: "long" })
            )
          );
        }

        // month offset
        else if (month.getMonth() != real.getMonth()) {
          const cell = row.appendChild(document.createElement("th"));
          cell.colSpan = 2;
          cell.classList.add("fc-day-empty");
        }

        // real day
        else {
          let hasBg = false;
          const thisDay = new Date(real.valueOf());
          thisDay.setHours(0, 0, 0, 0);
          const nextDay = new Date(thisDay.valueOf());
          nextDay.setDate(nextDay.getDate() + 1);
          const classes = ["fc-day"];
          if ([0, 6].includes(real.getDay())) classes.push("fc-day-weekend");
          if (
            real.toISOString().substr(0, 10) ==
            today.toISOString().substr(0, 10)
          )
            classes.push("fc-day-today");

          // html
          const day = row.appendChild(document.createElement("td"));
          day.classList.add(...classes);
          day.appendChild(
            document.createTextNode(("0" + real.getDate()).slice(-2))
          );
          day.appendChild(document.createElement("br"));
          day.appendChild(
            document.createTextNode(
              real.toLocaleString("de", { weekday: "short" })
            )
          );
          const cell = row.appendChild(document.createElement("td"));
          cell.classList.add("fc-events");
          events
            .filter(
              (event) =>
                event.start < nextDay &&
                event.end >= thisDay &&
                (event.allDay === false || event.end > nextDay)
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
                if (hasBg) return;
                hasBg = true;
                day.appendChild(elem);
                elem.classList.add("fc-bg-event");
                cell
                  .appendChild(elem.cloneNode(true))
                  .appendChild(document.createTextNode(event.title));
              }

              // normal event
              else {
                cell.appendChild(elem);
                elem.classList.add(
                  "fc-daygrid-event",
                  "fc-h-event",
                  "fc-event",
                  ...event.classNames,
                  ...event.source.internalEventSource.ui.classNames
                );
                const div = elem.appendChild(document.createElement("div"));
                div.classList.add("fc-event-main");
                div.appendChild(document.createElement("a"));
                div.appendChild(document.createTextNode(event.title));
                const meta = div.appendChild(document.createElement("div"));
                meta.classList.add("fc-event-meta");

                // event time
                if (!event.allDay) {
                  const time = meta.appendChild(document.createElement("div"));
                  time.classList.add("fc-event-time");
                  time.appendChild(
                    document.createTextNode(
                      event.start.toLocaleTimeString(
                        options?.locale || navigator.language,
                        options?.eventTimeFormat?.standardDateProps || {}
                      )
                    )
                  );
                }

                // event location
                if (event.extendedProps.location) {
                  const location = meta.appendChild(
                    document.createElement("div")
                  );
                  location.classList.add("fc-event-location");
                  location.appendChild(
                    document.createTextNode(event.extendedProps.location)
                  );
                }
              }
            });
        }
        month.setMonth(month.getMonth() + 1);
      }
    }
    return { domNodes: [table] };
  },
};
