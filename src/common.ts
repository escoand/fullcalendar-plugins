import {
  CalendarApi,
  Duration,
  EventRenderRange,
  FormatterInput,
} from "@fullcalendar/core";
import {
  BgEvent,
  DateProfile,
  DateRange,
  StandardEvent,
  ViewContext,
  ViewProps,
  createFormatter,
  getDateMeta,
} from "@fullcalendar/core/internal";
import { h } from "@fullcalendar/core/preact";

const DEFAULT_MONTH_FORMAT: FormatterInput = {
  month: "long",
};

export const DEFAULT_DATE_FORMATTER = createFormatter({
  day: "2-digit",
  omitCommas: true,
  weekday: "short",
});

const DEFAULT_TIME_FORMATTER = createFormatter({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: true,
  meridiem: "narrow",
});

export interface ExtendedViewProps extends ViewProps {
  dateProfile: DateProfile;
  nextDayThreshold: Duration;
}

interface BaseProps {
  children?: [];
}

interface EventListProps extends BaseProps {
  context: ViewContext;
  date: Date;
  events: EventRenderRange[];
}

interface EventProps {
  context: ViewContext;
  event: EventRenderRange;
}
interface BackgroundEventsProps {
  events?: EventRenderRange[];
}

function createProps(event: EventRenderRange) {
  const meta = getDateMeta(event.instance.range.start, getFullDayRange());
  return Object.assign(meta, {
    seg: {
      isStart: true,
      isEnd: false,
      eventRange: event,
    },
  });
}

export function getFullDayRange(date?: Date): DateRange {
  if (!date) date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + 1);
  return { start: date, end: next };
}

export function formatMonth(date: Date, calendar: CalendarApi) {
  return calendar.formatDate(date, DEFAULT_MONTH_FORMAT);
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
}

export function EventListCellComponent(props: EventListProps) {
  const { children, context, date, events } = props;
  return h(
    "td",
    { class: ["fc-events", isToday(date) ? "fc-day-today" : null].join(" ") },
    events.map((event) => h(EventComponent, { context, event })),
    children
  );
}

export function BackgroundEventComponent(props: BackgroundEventsProps) {
  const { events } = props;
  if (events.length === 0) return null;
  const childProps = createProps(events[0]);
  return h(BgEvent, childProps);
}

export function EventComponent(props: EventProps) {
  const { event } = props;
  const childProps = createProps(event);
  return h(
    StandardEvent,
    Object.assign(childProps, {
      defaultTimeFormat: DEFAULT_TIME_FORMATTER,
      elClasses: ["fc-h-event"],
      isDragging: false,
      isResizing: false,
      isDateSelecting: false,
      isSelected: false,
    })
  );
}
