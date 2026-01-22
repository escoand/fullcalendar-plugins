import { createPlugin, SpecificViewContentArg } from "@fullcalendar/core";
import {
  sliceEventStore,
  TableDateCell,
  ViewContext,
} from "@fullcalendar/core/internal";
import { ComponentChild, createElement } from "@fullcalendar/core/preact";
import "core-js/stable";
import {
  DEFAULT_DATE_FORMATTER,
  EventListCellComponent,
  getFullDayRange,
  InteractiveDateComponent,
} from "./common";
// @ts-expect-error
import css from "./multicol.css";

class MultiColumnComponent extends InteractiveDateComponent {
  render(
    props: SpecificViewContentArg,
    state: Readonly<any>,
    context: ViewContext
  ): ComponentChild {
    const showDayHeaders = context.viewApi.getOption("dayHeaders");
    const dayHeaderFormat =
      context.viewApi.getOption("dayHeaderFormat") || DEFAULT_DATE_FORMATTER;
    const todayRange = getFullDayRange();
    const fgSources = Object.values(
      context.calendarApi.getCurrentData().eventSources
    ).filter((source) => !["background", "none"].includes(source?.ui.display));

    // cols
    const cols = showDayHeaders
      ? [createElement("col", { class: "fc-day-col" })]
      : [];
    fgSources.forEach(() => cols.push(createElement("col", {})));

    // headers
    const headers = fgSources.map((source) =>
      createElement(
        "th",
        { class: "fc-col-header-cell fc-day", role: "columnheader" },
        createElement(
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
        createElement(
          "tr",
          { class: "fc-multicol-row" },
          showDayHeaders &&
            createElement(TableDateCell, {
              dayHeaderFormat,
              date: thisDay.start,
              dateProfile: props.dateProfile,
              todayRange,
              colCnt: 1,
              extraRenderProps: { class: "extra" },
            }),
          fgSources.map((source) =>
            createElement(EventListCellComponent, {
              bgEvents: events.bg,
              context,
              date: thisDay.start,
              dateProfile: props.dateProfile,
              fgEvents: events.fg.filter(
                (event) => event.def.sourceId == source.sourceId
              ),
              dateSelection: props.dateSelection,
              eventSelection: props.eventSelection,
              eventDrag: props.eventDrag,
              eventResize: props.eventResize,
              todayRange,
            })
          )
        )
      );

      date.setUTCDate(date.getUTCDate() + 1);
    }

    return [
      createElement(
        "table",
        { class: "fc-scrollgrid fc-multicol" },
        createElement("colgroup", {}, cols),
        createElement(
          "thead",
          {},
          createElement(
            "tr",
            {},
            showDayHeaders && [createElement("th", {})],
            headers
          )
        ),
        createElement("tbody", {}, rows)
      ),
      createElement("style", {}, css),
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
