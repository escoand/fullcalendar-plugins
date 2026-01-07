import { EventRenderRange, FormatDateOptions } from "@fullcalendar/core";
import {
  BgEvent,
  DateComponent,
  DateProfile,
  DateRange,
  DateSpan,
  DayCellContainer,
  EventInteractionState,
  Seg,
  StandardEvent,
  ViewContext,
  createFormatter,
  getDateMeta,
  getDayClassNames,
  getSegMeta,
} from "@fullcalendar/core/internal";
import { createElement } from "@fullcalendar/core/preact";

export const DEFAULT_MONTH_FORMAT: FormatDateOptions = {
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

interface EventListProps {
  bgEvents: EventRenderRange[];
  context: ViewContext;
  date: Date;
  dateProfile: DateProfile;
  dateSelection: DateSpan | null;
  eventSelection: string;
  eventDrag: EventInteractionState | null;
  eventResize: EventInteractionState | null;
  fgEvents: EventRenderRange[];
  todayRange: DateRange;
}

interface ForegroundEventProps {
  eventRange: EventRenderRange;
  isDateSelecting: boolean;
  isDragging: boolean;
  isResizing: boolean;
  isSelected: boolean;
  todayRange: DateRange;
}
interface BackgroundEventProps {
  eventRange: EventRenderRange;
  todayRange: DateRange;
}

function getEventProps(eventRange: EventRenderRange, todayRange: DateRange) {
  const seg: Seg = {
    eventRange,
    isEnd: eventRange?.instance?.range.end <= todayRange.end,
    isStart: eventRange?.instance?.range.start >= todayRange.start,
  };
  const segMeta = getSegMeta(seg, todayRange);
  return {
    ...segMeta,
    seg,
  };
}

export function getFullDayRange(date?: Date, offset?: number): DateRange {
  const start = new Date(date || Date.now());
  offset && start.setUTCDate(start.getUTCDate() + offset);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
}

export abstract class InteractiveDateComponent extends DateComponent {
  private rootEl?: HTMLElement;

  componentDidMount(): void {
    if (!this.rootEl) {
      this.rootEl = this.base as HTMLElement;
    }
    this.context.registerInteractiveComponent(this, { el: this.rootEl });
  }

  componentWillUnmount(): void {
    if (this.rootEl) {
      this.context.unregisterInteractiveComponent(this);
      this.rootEl = undefined;
    }
  }
}

export function EventListCellComponent(props: EventListProps) {
  const meta = getDateMeta(
    props.date,
    props.todayRange,
    props.dateProfile.currentDate,
    props.dateProfile
  );
  return createElement(DayCellContainer, {
    ...props,
    elClasses: getDayClassNames(meta, props.context.theme).concat([
      "fc-events",
    ]),
    elTag: "td",
    todayRange: props.todayRange,
    children: (InnerContent, renderProps) => [
      props.fgEvents.map((eventRange) =>
        createElement(
          ForegroundEventComponent,
          {
            eventRange,
            isDateSelecting: false,
            isDragging: Boolean(props.eventDrag),
            isResizing: Boolean(props.eventResize),
            isSelected: Boolean(props.eventSelection),
            todayRange: props.todayRange,
          },
          InnerContent
        )
      ),
      props.bgEvents.map((eventRange) =>
        createElement(BackgroundEventComponent, {
          eventRange,
          todayRange: props.todayRange,
        })
      ),
    ],
  });
}

function BackgroundEventComponent(props: BackgroundEventProps) {
  const eventProps = getEventProps(props.eventRange, props.todayRange);
  return createElement(BgEvent, {
    ...eventProps,
  });
}

function ForegroundEventComponent(props: ForegroundEventProps) {
  const eventProps = getEventProps(props.eventRange, props.todayRange);
  return createElement(StandardEvent, {
    ...eventProps,
    defaultTimeFormat: DEFAULT_TIME_FORMATTER,
    disableResizing: true,
    elClasses: ["fc-h-event"],
    isDateSelecting: props.isDateSelecting,
    isDragging: props.isDragging,
    isResizing: props.isResizing,
    isSelected: props.isSelected,
  });
}
