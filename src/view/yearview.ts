import { createPlugin, SpecificViewContentArg } from "@fullcalendar/core";
import {
  sliceEventStore,
  TableDateCell,
  ViewContext,
  ViewOptionsRefined,
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

const YearViewRefined = { weekdayAlign: Boolean };

type YearViewContext = ViewContext & {
  options: ViewOptionsRefined & {
    weekdayAlign: Boolean;
  };
};

class YearComponent extends InteractiveDateComponent {
  render(
    props: SpecificViewContentArg,
    state: Readonly<any>,
    context: YearViewContext,
  ): ComponentChild {
    const dayHeaderFormat =
      context.options.dayHeaderFormat || DEFAULT_DATE_FORMATTER;
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

    // headers
    const headers = firstDateOfMonths.map((firstDay) => {
      return createElement(
        "th",
        { class: "fc-col-header-cell", colSpan: 2 },
        context.calendarApi.formatDate(firstDay, DEFAULT_MONTH_FORMAT),
      );
    });

    // day cells
    const cells = [];
    for (let date = 0; ; date++) {
      let hasDays = false;
      const rowCells = firstDateOfMonths.map((firstDate) => {
        const offset = context.options.weekdayAlign
          ? (firstDate.getUTCDay() + 6) % 7
          : 0;
        const thisDayRange = getFullDayRange(firstDate, date - offset);

        // offset
        if (firstDate.getUTCMonth() != thisDayRange.start.getUTCMonth()) {
          return createElement("td", { class: "fc-day-empty", colSpan: 2 });
        }
        hasDays = true;

        const events = sliceEventStore(
          props.eventStore,
          props.eventUiBases,
          thisDayRange,
          props.nextDayThreshold,
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
      });

      if (hasDays) {
        cells.push(createElement("tr", {}, rowCells));
      } else if (cells.length) {
        break;
      }
    }

    const monthCount = firstDateOfMonths.length;
    const gridStyle = `grid-template-columns: repeat(${monthCount}, 40px minmax(clamp(80px, 7vw, 96px), 1fr));`;

    return [
      createElement(
        "table",
        {
          class: "fc-scrollgrid fc-yearview",
          style: gridStyle,
        },
        createElement("thead", {}, createElement("tr", {}, headers)),
        createElement("tbody", {}, cells),
      ),
      createElement("style", {}, css),
    ];
  }
}

export default createPlugin({
  name: "YearView",
  initialView: "yearView",
  optionRefiners: YearViewRefined,
  views: {
    yearView: {
      component: YearComponent,
      dateAlignment: "year",
      duration: { years: 1 },
    },
  },
});
