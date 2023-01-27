import { createPlugin } from "@fullcalendar/core";
import {
  BaseComponent,
  TableDateCell,
  ViewContext,
  sliceEventStore,
} from "@fullcalendar/core/internal";
import { ComponentChild, h } from "@fullcalendar/core/preact";
import "core-js/stable";
import {
  BackgroundEventComponent,
  DEFAULT_DATE_FORMATTER,
  EventListCellComponent,
  ExtendedViewProps,
  getFullDayRange,
} from "./common";
// @ts-expect-error
import css from "./multicol.css";

class MultiColumnComponent extends BaseComponent {
  render(
    props: ExtendedViewProps,
    state: Readonly<{}>,
    context: ViewContext
  ): ComponentChild {
    const showDayHeaders = context.viewApi.getOption("dayHeaders");
    const dayHeaderFormat =
      context.viewApi.getOption("dayHeaderFormat") || DEFAULT_DATE_FORMATTER;
    const todayRange = getFullDayRange();

    const sources = context.calendarApi.getCurrentData().eventSources;
    const events = Object.values(
      sliceEventStore(
        props.eventStore,
        props.eventUiBases,
        props.dateProfile.activeRange,
        props.nextDayThreshold
      )
    ).flat();

    // headers
    const headers = Object.values(sources)
      .filter((source) => source.ui.display != "background")
      .map((source) =>
        h("th", { class: "fc-cell-shaded" }, source.extendedProps.name || "")
      );

    // days
    const dayMap = events.reduce((prev, cur) => {
      const epoc = new Date(cur.range.start).setUTCHours(0, 0, 0, 0);
      const src = cur.def.sourceId;
      if (!prev[epoc]) prev[epoc] = { [src]: [] };
      if (!prev[epoc][src]) prev[epoc][src] = [];
      prev[epoc][src].push(cur);
      return prev;
    }, {});

    // date rows
    const rows = Object.entries(dayMap)
      .sort(([epocA], [epocB]) => epocA.localeCompare(epocB))
      .map(([epoc]) => {
        const start = new Date(Number.parseInt(epoc));
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        const events = sliceEventStore(
          props.eventStore,
          props.eventUiBases,
          { start, end },
          props.nextDayThreshold
        );

        // normal events
        const cells = Object.values(sources)
          .filter((source) => source.ui.display != "background")
          .map((source) =>
            h(
              EventListCellComponent,
              {
                context,
                date: start,
                events: events.fg.filter(
                  (event) => event.def.sourceId == source.sourceId
                ),
              },
              h(BackgroundEventComponent, { events: events.bg })
            )
          );
        return h(
          "tr",
          { class: "fc-multicol-row" },
          showDayHeaders &&
            h(
              TableDateCell,
              {
                dayHeaderFormat,
                date: start,
                dateProfile: props.dateProfile,
                todayRange,
                colCnt: 0,
              },
              h(BackgroundEventComponent, { events: events.bg })
            ),
          cells
        );
      });

    return [
      h("style", {}, css),
      h(
        "table",
        { class: "fc-scrollgrid fc-multicol" },
        h(
          "thead",
          {},
          h(
            "tr",
            {},
            showDayHeaders && h("th", { class: "fc-cell-shaded fc-day" }),
            headers
          )
        ),
        h("tbody", {}, rows)
      ),
    ];
  }
}

export default createPlugin({
  name: "MultiColumnView",
  initialView: "multiCol",
  views: {
    multiCol: {
      component: MultiColumnComponent,
      dateAlignment: "week",
      duration: { weeks: 4 },
    },
  },
});
