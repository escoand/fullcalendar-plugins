import {
  CalendarApi,
  Duration,
  EventRenderRange,
  FormatterInput,
} from "@fullcalendar/core";
import {
  DateProfile,
  DateRange,
  ViewContext,
  ViewProps,
} from "@fullcalendar/core/internal";
import { h } from "@fullcalendar/core/preact";

const DEFAULT_DISPLAY_END = false;
const DEFAULT_MONTH_FORMAT: FormatterInput = {
  month: "long",
};
const DEFAULT_DATE_FORMAT: FormatterInput = {
  day: "2-digit",
  omitCommas: true,
  weekday: "short",
};
const DEFAULT_TIME_FORMAT: FormatterInput = {
  timeStyle: "short",
};

export interface ExtendedViewProps extends ViewProps {
  dateProfile: DateProfile;
  nextDayThreshold: Duration;
}

interface BaseProps {
  children?: [];
}

export interface DayHeaderCellProps extends BaseProps {
  class?: string;
  context: ViewContext;
  date: Date;
}

export interface DayHeaderProps {
  context: ViewContext;
  date: Date;
}
export interface EventListProps extends BaseProps {
  class?: string;
  context: ViewContext;
  date: Date;
  events: EventRenderRange[];
  tag?: string;
}

export interface EventProps {
  context: ViewContext;
  event: EventRenderRange;
}
export interface BackgroundEventProps {
  event?: EventRenderRange;
}

export function formatMonth(date: Date, calendar: CalendarApi) {
  return calendar.formatDate(date, DEFAULT_MONTH_FORMAT);
}

export function formatDate(date: Date, calendar: CalendarApi) {
  return calendar.formatDate(
    date,
    calendar.view.getOption("eventTimeFormat")?.standardDateProps ||
      DEFAULT_TIME_FORMAT
  );
}

export function formatTime(date: DateRange, calendar: CalendarApi) {
  return calendar.view.getOption("displayEventEnd") ??
    calendar.getOption("displayEventEnd") ??
    DEFAULT_DISPLAY_END
    ? calendar.formatRange(
        date.start,
        date.end,
        calendar.view.getOption("eventTimeFormat")?.standardDateProps ||
          DEFAULT_TIME_FORMAT
      )
    : formatDate(date.start, calendar);
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
}

export function DateHeaderCellComponent(props: DayHeaderCellProps) {
  const { children, class: clazz, date } = props;
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return h(
    "td",
    {
      class: [
        clazz,
        "fc-day",
        "fc-day-" +
          date.toLocaleDateString("en", { weekday: "short" }).toLowerCase(),
        isToday(start) ? "fc-day-today" : null,
      ].join(" "),
    },
    h(DateHeaderComponent, props),
    children
  );
}

export function DateHeaderComponent(props: DayHeaderProps) {
  const { context, date } = props;
  return (
    context.viewApi.getOption("dayHeaderFormat")?.cmdStr ||
    context.calendarApi.formatDate(
      date,
      context.viewApi.getOption("dayHeaderFormat")?.standardDateProps ||
        DEFAULT_DATE_FORMAT
    )
  );
}

export function EventListCellComponent(props: EventListProps) {
  const { children, class: clazz, context, date, events, tag } = props;
  return h(
    tag || "td",
    {
      class: [clazz, "fc-events", isToday(date) ? "fc-day-today" : null].join(
        " "
      ),
    },
    events.map((event) => h(EventComponent, { context, event })),
    children
  );
}

export function BackgroundEventComponent(props: BackgroundEventProps) {
  return h("div", {
    class: "fc-bg-event",
    style: {
      backgroundColor:
        props.event?.ui.backgroundColor || props.event?.def.ui.backgroundColor,
    },
  });
}

export function EventComponent(props: EventProps) {
  const { event } = props;
  return h(
    "div",
    {
      class: [
        "fc-h-event",
        "fc-event",
        ...event.def.ui.classNames,
        ...event.ui.classNames,
      ].join(" "),
      style: {
        backgroundColor:
          event.def.ui.backgroundColor || event.ui.backgroundColor,
        borderColor: event.def.ui.borderColor || event.ui.borderColor,
        color: event.def.ui.textColor || event.ui.textColor,
      },
    },
    h(EventContentComponent, props)
  );
}

export function EventContentComponent(props: EventProps) {
  const { context, event } = props;
  return h(
    "div",
    {
      class: "fc-event-main",
      title: JSON.stringify(event.range.toString(), null),
      // ToDo
      onClick: (ev) =>
        context.emitter.trigger("eventClick", {
          // @ts-expect-error
          el: ev.target,
          // @ts-expect-error
          event: event,
          jsEvent: ev,
          view: context.viewApi,
        }),
    },
    h("a", {}),
    event.def.title,
    h(
      "div",
      { class: "fc-event-meta" },
      !event.def.allDay
        ? h(
            "div",
            { class: "fc-event-time" },
            formatTime(event.range, context.calendarApi)
          )
        : null,
      event.def.extendedProps.location
        ? h(
            "div",
            { class: "fc-event-location" },
            event.def.extendedProps.location
          )
        : null
    )
  );
}
