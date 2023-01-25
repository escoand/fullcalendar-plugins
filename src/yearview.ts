import {
  Duration,
  EventRenderRange,
  ViewApi,
  createPlugin,
} from "@fullcalendar/core";
import {
  BaseComponent,
  DateProfile,
  ViewContext,
  ViewProps,
  rangeContainsMarker,
  rangesIntersect,
  sliceEventStore,
} from "@fullcalendar/core/internal";
import { ComponentChild, VNode, h } from "@fullcalendar/core/preact";
import "core-js/stable";
// @ts-expect-error
import { default as css } from "./yearview.css";

interface ExtendedViewProps extends ViewProps {
  dateProfile: DateProfile;
  nextDayThreshold: Duration;
}

// convert DOM to preact VDOM
// https://gist.github.com/developit/1409519fe1d62fb02a64b35a2e2fb66f
function convertToVdom(node: HTMLElement | Text): VNode {
  // @ts-expect-error
  if (node.nodeType === 3) return node.data;
  let props = {};
  // @ts-expect-error
  for (let i = 0; i < node.attributes.length; i++)
    // @ts-expect-error
    props[node.attributes[i].name] = node.attributes[i].value;
  // @ts-expect-error
  return h(node.localName, props, [].map.call(node.childNodes, convertToVdom));
}

// content of event
function eventContent(event: EventRenderRange, view: ViewApi): Node[] {
  const nodes = [] as Node[];
  nodes.push(document.createElement("a"));
  nodes.push(document.createTextNode(event.def.title));
  const meta = document.createElement("div");
  meta.classList.add("fc-event-meta");
  nodes.push(meta);

  // event time
  if (!event.def.allDay) {
    const time = meta.appendChild(document.createElement("div"));
    time.classList.add("fc-event-time");
    time.append(
      event.instance.range.start.toLocaleTimeString(
        view.getOption("locale") || navigator.language,
        view.getOption("eventTimeFormat")?.standardDateProps || {}
      )
    );
  }

  // event location
  if (event.def.extendedProps.location) {
    const location = meta.appendChild(document.createElement("div"));
    location.classList.add("fc-event-location");
    location.append(event.def.extendedProps.location);
  }

  return nodes;
}

class YearComponent extends BaseComponent {
  render(
    props: ExtendedViewProps,
    state: Readonly<{}>,
    context: ViewContext
  ): ComponentChild {
    const view = context.viewApi;
    const events = Object.values(
      sliceEventStore(
        props.eventStore,
        props.eventUiBases,
        props.dateProfile.activeRange,
        props.nextDayThreshold
      )
    ).flat();
    const today = new Date();
    const container = document.createElement("div");
    container.appendChild(document.createElement("style")).textContent = css;
    const table = container.appendChild(document.createElement("table"));
    table.classList.add("fc-scrollgrid", "fc-yearview");

    // loop days
    for (let date = -1; date <= 37; date++) {
      let row;
      if (date == -1)
        row = table.appendChild(document.createElement("colgroup"));
      else row = table.appendChild(document.createElement("tr"));
      const month = new Date(props.dateProfile.renderRange.start.valueOf());
      month.setDate(1);
      while (month.getTime() < props.dateProfile.renderRange.end.getTime()) {
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
          if (rangeContainsMarker({ start: thisDay, end: nextDay }, today)) {
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
              rangesIntersect(
                {
                  start: event.instance.range.start,
                  end:
                    event.instance.range.end ||
                    context.dateEnv.add(
                      event.instance.range.start,
                      event.def.allDay
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
                event.def.ui.backgroundColor || event.ui.backgroundColor;
              elem.style.borderColor =
                event.def.ui.borderColor || event.ui.borderColor;
              elem.style.color = event.def.ui.textColor || event.ui.textColor;

              // background event
              if (
                [event.def.ui.display, event.ui.display].includes("background")
              ) {
                day.appendChild(elem);
                elem.classList.add("fc-bg-event");
                cell.appendChild(elem.cloneNode(true)).append(event.def.title);
              }

              // normal event
              else {
                cell.appendChild(elem);
                elem.classList.add(
                  "fc-h-event",
                  "fc-event",
                  ...event.def.ui.classNames,
                  ...event.ui.classNames
                );
                const div = elem.appendChild(document.createElement("div"));
                div.classList.add("fc-event-main");

                // content
                div.append(...eventContent(event, view));

                // click event
                if (event.def.url) elem.style.cursor = "pointer";
                elem.addEventListener("click", (ev) =>
                  context.emitter.trigger("eventClick", {
                    // @ts-expect-error
                    el: ev.target,
                    // @ts-expect-error
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

    return convertToVdom(container);
  }
}

export default createPlugin({
  name: "YearView",
  initialView: "yearView",
  views: {
    yearView: {
      dateAlignment: "year",
      duration: { years: 1 },
      component: YearComponent,
    },
  },
});
