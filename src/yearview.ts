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
  DEFAULT_MONTH_FORMAT,
  EventListCellComponent,
  ExtendedViewProps,
  getFullDayRange,
} from "./common";
// @ts-expect-error
import css from "./yearview.css";

const DEFAULT_MONTH_COUNT = 12;

class YearComponent extends BaseComponent {
  render(
    props: ExtendedViewProps,
    state: Readonly<{}>,
    context: ViewContext
  ): ComponentChild {
    const dayHeaderFormat =
      context.viewApi.getOption("dayHeaderFormat") || DEFAULT_DATE_FORMATTER;
    const todayRange = getFullDayRange();
    const firstDays = Array.from(
      Array(
        context.options.duration?.years * 12 ||
          context.options.duration?.months ||
          DEFAULT_MONTH_COUNT
      ).keys()
    ).map((month) => {
      const date = new Date(props.dateProfile.renderRange.start);
      date.setUTCMonth(date.getMonth() + month, 1);
      return date;
    });

    // columns
    const cols = firstDays.map(() => [
      h("col", { class: "fc-day-col" }),
      h("col", {}),
    ]);

    // headers
    const headers = firstDays.map((firstDay) => {
      return h(
        "th",
        { class: "fc-col-header-cell", colSpan: 2 },
        context.calendarApi.formatDate(firstDay, DEFAULT_MONTH_FORMAT)
      );
    });

    // day cells
    const cells = Array.from(Array(37).keys()).map((date) =>
      h(
        "tr",
        {},
        firstDays.map((firstDay) => {
          const offset = (firstDay.getUTCDay() + 6) % 7;
          const thisDay = getFullDayRange(firstDay, date - offset);

          // offset
          if (firstDay.getUTCMonth() != thisDay.start.getUTCMonth()) {
            return h("td", { class: "fc-day-empty", colSpan: 2 });
          }

          const events = sliceEventStore(
            props.eventStore,
            props.eventUiBases,
            thisDay,
            props.nextDayThreshold
          );
          return [
            h(TableDateCell, {
              dayHeaderFormat,
              date: thisDay.start,
              dateProfile: props.dateProfile,
              todayRange,
              colCnt: 0,
            }),
            h(
              EventListCellComponent,
              {
                context,
                date: thisDay.start,
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
      duration: { years: 1 },
    },
  },
});
