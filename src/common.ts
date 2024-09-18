import { Duration, EventRenderRange, FormatterInput } from "@fullcalendar/core";
import {
  BgEvent,
  DateProfile,
  DateRange,
  StandardEvent,
  ViewContext,
  ViewProps,
  createFormatter,
  getDateMeta,
  getDayClassNames,
} from "@fullcalendar/core/internal";
import { h } from "@fullcalendar/core/preact";

export const DEFAULT_MONTH_FORMAT: FormatterInput = {
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
interface BackgroundEventProps {
  events?: EventRenderRange[];
}

function createProps(event: EventRenderRange) {
  const today = getFullDayRange();
  const meta = getDateMeta(event.instance.range.start, today);
  return Object.assign(meta, {
    seg: {
      isStart: event.instance.range.start >= today.start,
      isEnd: event.instance.range.end <= today.end,
      eventRange: event,
    },
  });
}

export function getFullDayRange(date?: Date, offset?: number): DateRange {
  const start = new Date(date || Date.now());
  offset && start.setUTCDate(start.getUTCDate() + offset);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
}

export function EventListCellComponent(props: EventListProps) {
  const { children, context, date, events } = props;
  const meta = getDateMeta(date, getFullDayRange());
  return h(
    "td",
    {
      class: getDayClassNames(meta, context.theme)
        .concat(["fc-events"])
        .join(" "),
    },
    events.map((event) => h(EventComponent, { context, event })),
    children
  );
}

export function BackgroundEventComponent(props: BackgroundEventProps) {
  const { events } = props;
  if (events.length === 0) return;
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
