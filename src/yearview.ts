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
  formatMonth,
  getFullDayRange,
} from "./common";
// @ts-expect-error
import css from "./yearview.css";

class YearComponent extends BaseComponent {
  render(
    props: ExtendedViewProps,
    state: Readonly<{}>,
    context: ViewContext
  ): ComponentChild {
    const dayHeaderFormat =
      context.viewApi.getOption("dayHeaderFormat") || DEFAULT_DATE_FORMATTER;
    const todayRange = getFullDayRange();

    // columns
    const cols = Array.from(Array(12).keys()).map(() => [
      h("col", { class: "fc-day-col" }),
      h("col", {}),
    ]);

    // headers
    const headers = Array.from(Array(12).keys()).map((month) => {
      const firstDay = new Date(props.dateProfile.renderRange.start);
      firstDay.setUTCMonth(month, 1);
      return h(
        "th",
        { class: "fc-cell-shaded", colSpan: 2 },
        formatMonth(firstDay, context.calendarApi)
      );
    });

    // cells
    const cells = Array.from(Array(37).keys()).map((date) =>
      h(
        "tr",
        {},
        Array.from(Array(12).keys()).map((month) => {
          const firstDay = new Date(props.dateProfile.renderRange.start);
          firstDay.setUTCMonth(month, 1);
          const offset = (firstDay.getDay() + 6) % 7;
          const start = new Date(firstDay);
          start.setDate(date - offset + 1);

          // offset
          if (firstDay.getUTCMonth() != start.getUTCMonth()) {
            return h("td", { class: "fc-day-empty", colSpan: 2 });
          }

          const end = new Date(start);
          end.setUTCDate(end.getUTCDate() + 1);
          const events = sliceEventStore(
            props.eventStore,
            props.eventUiBases,
            { start, end },
            props.nextDayThreshold
          );
          return [
            h(TableDateCell, {
              dayHeaderFormat,
              date: start,
              dateProfile: props.dateProfile,
              todayRange,
              colCnt: 0,
            }),
            h(
              EventListCellComponent,
              {
                context,
                date: start,
                events: events.fg,
              },
              h(BackgroundEventComponent, { events: events.bg })
            ),
          ];
        })
      )
    );

    return [
      h("style", {}, css),
      h(
        "table",
        { class: "fc-scrollgrid fc-yearview" },
        h("colgroup", {}, cols),
        h("thead", {}, h("tr", {}, headers)),
        h("tbody", {}, cells)
      ),
    ];
  }
}

export default createPlugin({
  name: "YearView",
  initialView: "yearView",
  views: {
    yearView: {
      component: YearComponent,
      dateAlignment: "year",
      duration: { years: 1 },
    },
  },
});
