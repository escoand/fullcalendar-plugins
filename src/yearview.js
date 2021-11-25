export default {
  // date range
  dateAlignment: "year",
  duration: { years: 1 },

  // content
  content: (args) => {
    const today = new Date();
    const options = calendar?.getCurrentData()?.options || {};
    const end = args.dateProfile.renderRange.end;
    const evtInstances = Object.values(args.eventStore.instances);
    const table = document.createElement("table");
    table.classList.add("fc-scrollgrid");

    // find events
    const events = [];
    for (let i = 0; i < evtInstances.length; i++) {
      const src = args.eventUiBases[evtInstances[i].defId];
      events.push({
        instance: evtInstances[i],
        def: args.eventStore.defs[evtInstances[i].defId],
        src: src,
      });
    }

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
          const dayStart = new Date(real.valueOf());
          dayStart.setHours(0);
          dayStart.setMinutes(0);
          dayStart.setSeconds(0);
          dayStart.setMilliseconds(0);
          const dayEnd = new Date(dayStart.valueOf());
          dayEnd.setDate(dayEnd.getDate() + 1);
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
                event.instance.range.start.getTime() >= dayStart.getTime() &&
                event.instance.range.start.getTime() < dayEnd.getTime()
            )
            .map((event) => {
              // background event
              if (
                [event.def.ui.display, event.src.display].includes("background")
              ) {
                if (hasBg) return;
                hasBg = true;
                let bg = day.appendChild(document.createElement("div"));
                bg.classList.add("fc-bg-event");
                bg.style.backgroundColor =
                  event.def.ui.backgroundColor || event.src.backgroundColor;
                bg.style.borderColor =
                  event.def.ui.borderColor || event.src.borderColor;
                bg.style.textColor =
                  event.def.ui.textColor || event.src.textColor;
                bg = cell.appendChild(bg.cloneNode(true));
                bg.appendChild(document.createTextNode(event.def.title));
              }

              // normal event
              else {
                const evt = cell.appendChild(document.createElement("div"));
                evt.classList.add(
                  "fc-daygrid-event",
                  "fc-h-event",
                  "fc-event",
                  ...event.def.ui.classNames,
                  ...event.src.classNames
                );
                evt.style.backgroundColor =
                  event.def.ui.backgroundColor || event.src.backgroundColor;
                evt.style.borderColor =
                  event.def.ui.borderColor || event.src.borderColor;
                evt.style.textColor =
                  event.def.ui.textColor || event.src.textColor;
                const div = evt.appendChild(document.createElement("div"));
                div.classList.add("fc-event-main");
                div.appendChild(document.createElement("a"));
                div.appendChild(document.createTextNode(event.def.title));
                const meta = div.appendChild(document.createElement("div"));
                meta.classList.add("fc-event-meta");

                // event time
                if (!event.def.allDay) {
                  const time = meta.appendChild(document.createElement("div"));
                  time.classList.add("fc-event-time");
                  time.appendChild(
                    document.createTextNode(
                      event.instance.range.start.toLocaleTimeString(
                        options?.locale || navigator.language,
                        options?.eventTimeFormat?.standardDateProps || {}
                      )
                    )
                  );
                }

                // event location
                if (event.def.extendedProps.location) {
                  const location = meta.appendChild(
                    document.createElement("div")
                  );
                  location.classList.add("fc-event-location");
                  location.appendChild(
                    document.createTextNode(event.def.extendedProps.location)
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
