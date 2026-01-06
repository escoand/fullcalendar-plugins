import { createPlugin } from "@fullcalendar/core";
import {
  BaseComponent,
  sliceEventStore,
  TableDateCell,
  ViewContext
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
    const fgSources = Object.values(
      context.calendarApi.getCurrentData().eventSources
    ).filter((source) => source?.ui.display != "background");

    // cols
    const cols = showDayHeaders ? [h("col", { class: "fc-day-col" })] : [];
    fgSources.forEach(() => cols.push(h("col", {})));

    // headers
    const headers = (showDayHeaders ? [null] : [])
      .concat(fgSources)
      .map((source) =>
        h(
          "th",
          { class: "fc-col-header-cell fc-day", role: "columnheader" },
          h(
            "div",
            { class: "fc-scrollgrid-sync-inner" },
            source?.extendedProps.name || ""
          )
        )
      );

    // day rows
    const rows = [];
    const date = new Date(props.dateProfile.renderRange.start);
    while (date.getTime() < props.dateProfile.renderRange.end.getTime()) {
      const thisDay = getFullDayRange(date);
      const events = sliceEventStore(
        props.eventStore,
        props.eventUiBases,
        thisDay,
        props.nextDayThreshold
      );

      rows.push(
        h(
          "tr",
          { class: "fc-multicol-row" },
          showDayHeaders &&
            h(TableDateCell, {
              dayHeaderFormat,
              date: thisDay.start,
              dateProfile: props.dateProfile,
              todayRange,
              colCnt: 1,
              extraRenderProps: { class: "extra" },
            }),
          fgSources.map((source) =>
            h(
              EventListCellComponent,
              {
                context,
                date: thisDay.start,
                events: events.fg.filter(
                  (event) => event.def.sourceId == source.sourceId
                ),
              },
              h(BackgroundEventComponent, { events: events.bg })
            )
          )
        )
      );

      date.setUTCDate(date.getUTCDate() + 1);
    }

    return [
      h("style", {}, css),
      h(
        "table",
        { class: "fc-scrollgrid fc-multicol" },
        h("colgroup", {}, cols),
        h("thead", {}, h("tr", {}, headers)),
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
