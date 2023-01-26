import { CalendarApi, Duration, EventRenderRange } from "@fullcalendar/core";
import {
  DateProfile,
  DateRange,
  ViewContext,
  ViewProps,
} from "@fullcalendar/core/internal";
import { h } from "@fullcalendar/core/preact";

const DEFAULT_DISPLAY_END = false;
const DEFAULT_DATE_FORMAT = {
  day: "2-digit",
  weekday: "short",
};
const DEFAULT_TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
};

export interface ExtendedViewProps extends ViewProps {
  dateProfile: DateProfile;
  nextDayThreshold: Duration;
}

export interface DayHeaderProps {
  context: ViewContext;
  date: Date;
}

export interface EventListProps {
  context: ViewContext;
  events: EventRenderRange[];
  tag?: string;
}

export interface EventViewProps {
  context: ViewContext;
  event: EventRenderRange;
}

function formatTime(date: DateRange, calendar: CalendarApi) {
  return calendar.view.getOption("displayEventEnd") ??
    calendar.getOption("displayEventEnd") ??
    DEFAULT_DISPLAY_END
    ? calendar.formatRange(
        date.start,
        date.end,
        calendar.view.getOption("eventTimeFormat")?.standardDateProps ||
          DEFAULT_TIME_FORMAT
      )
    : calendar.formatDate(
        date.start,
        calendar.view.getOption("eventTimeFormat")?.standardDateProps ||
          DEFAULT_TIME_FORMAT
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
  const { context, events, tag } = props;
  return h(
    tag || "td",
    {},
    events.map((event) => h(EventComponent, { context, event }))
  );
}

export function BackgroundEventComponent() {
  return h("div", { class: "fc-bg-event" });
}

export function EventComponent(props: EventViewProps) {
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

export function EventContentComponent(props: EventViewProps) {
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
