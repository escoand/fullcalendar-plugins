import { createPlugin } from "@fullcalendar/core";
import {
  BaseComponent,
  ViewContext,
  sliceEventStore,
} from "@fullcalendar/core/internal";
import { ComponentChild, h } from "@fullcalendar/core/preact";
import "core-js/stable";
import {
  BackgroundEventComponent,
  DateHeaderComponent,
  EventListCellComponent,
  ExtendedViewProps,
} from "./common";
import { default as css } from "./multicol.css";

class MultiColumnComponent extends BaseComponent {
  render(
    props: ExtendedViewProps,
    state: Readonly<{}>,
    context: ViewContext
  ): ComponentChild {
    const sources = context.calendarApi.getCurrentData().eventSources;
    const events = Object.values(
      sliceEventStore(
        props.eventStore,
        props.eventUiBases,
        props.dateProfile.activeRange,
        props.nextDayThreshold
      )
    ).flat();
    const showDayHeaders = context.viewApi.getOption("dayHeaders");

    // headers
    const headers = Object.values(sources)
      .filter((source) => source.ui.display != "background")
      .map((source) =>
        h("th", { class: "fc-cell-shaded" }, source.extendedProps.name || "")
      );

    // days
    const dayMap = events.reduce((prev, cur) => {
      const epoc = new Date(cur.range.start).setHours(0, 0, 0, 0);
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
            h(EventListCellComponent, {
              context,
              events: events.fg.filter(
                (event) => event.def.sourceId == source.sourceId
              ),
            })
          );

        return h(
          "tr",
          { class: "fc-multicol-row" },
          showDayHeaders &&
            h(
              "td",
              { class: "fc-cell-shaded fc-day" },
              h(DateHeaderComponent, { context, date: start }),
              events.bg.length > 0 && h(BackgroundEventComponent, {})
            ),
          cells
        );
      });

    return h(
      "div",
      {},
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
            showDayHeaders && h("th", { class: "fc-cell-shaded" }),
            headers
          )
        ),
        h("tbody", {}, rows)
      )
    );
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
