import {
  createPlugin,
  formatDate,
  SpecificViewContentArg,
} from "@fullcalendar/core";
import {
  sliceEventStore,
  TableDateCell,
  ViewContext,
} from "@fullcalendar/core/internal";
import { ComponentChild, createElement } from "@fullcalendar/core/preact";
import "core-js/stable";
import {
  DEFAULT_DATE_FORMATTER,
  DEFAULT_MONTH_FORMAT,
  EventListCellComponent,
  getFullDayRange,
  InteractiveDateComponent,
} from "./common";
// @ts-expect-error
import css from "./yearview.css";

class YearComponent extends InteractiveDateComponent {
  render(
    props: SpecificViewContentArg,
    state: Readonly<any>,
    context: ViewContext
  ): ComponentChild {
    const dayHeaderFormat =
      context.viewApi.getOption("dayHeaderFormat") || DEFAULT_DATE_FORMATTER;
    const todayRange = getFullDayRange();
    const firstDateOfMonths: Date[] = [];
    let date: Date;
    for (
      date = new Date(props.dateProfile.renderRange.start);
      date < props.dateProfile.renderRange.end;
      date.setUTCMonth(date.getMonth() + 1)
    ) {
      date.setUTCDate(1);
      firstDateOfMonths.push(new Date(date));
    }

    // columns
    const cols = firstDateOfMonths.map(() => [
      createElement("col", { class: "fc-day-col" }),
      createElement("col", {}),
    ]);

    // headers
    const headers = firstDateOfMonths.map((firstDay) => {
      return createElement(
        "th",
        { class: "fc-col-header-cell", colSpan: 2 },
        formatDate(firstDay, DEFAULT_MONTH_FORMAT)
      );
    });

    // day cells
    const cells = Array.from(Array(37).keys()).map((date) =>
      createElement(
        "tr",
        {},
        firstDateOfMonths.map((firstDate) => {
          const offset = (firstDate.getUTCDay() + 6) % 7;
          const thisDayRange = getFullDayRange(firstDate, date - offset);

          // offset
          if (firstDate.getUTCMonth() != thisDayRange.start.getUTCMonth()) {
            return createElement("td", { class: "fc-day-empty", colSpan: 2 });
          }

          const events = sliceEventStore(
            props.eventStore,
            props.eventUiBases,
            thisDayRange,
            props.nextDayThreshold
          );
          return [
            createElement(TableDateCell, {
              dayHeaderFormat,
              date: thisDayRange.start,
              dateProfile: props.dateProfile,
              todayRange,
              colCnt: 0,
            }),
            createElement(EventListCellComponent, {
              bgEvents: events.bg,
              context,
              date: thisDayRange.start,
              dateProfile: props.dateProfile,
              fgEvents: events.fg,
              dateSelection: props.dateSelection,
              eventSelection: props.eventSelection,
              eventDrag: props.eventDrag,
              eventResize: props.eventResize,
              todayRange,
            }),
          ];
        })
      )
    );

    return [
      createElement(
        "table",
        { class: "fc-scrollgrid fc-yearview" },
        createElement("colgroup", {}, cols),
        createElement("thead", {}, createElement("tr", {}, headers)),
        createElement("tbody", {}, cells)
      ),
      createElement("style", {}, css),
    ];
  }
}

export default createPlugin({
  name: "YearView",
  initialView: "yearView",
  views: {
    yearView: {
      dateAlignment: "year",
      component: YearComponent,
      duration: { years: 1 },
    },
  },
});
