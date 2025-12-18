import { createPlugin, EventClickArg } from "@fullcalendar/core";
import {
  elementClosest,
  EventImpl,
  getElSeg,
  identity,
  Identity,
  Interaction,
  InteractionSettings,
} from "@fullcalendar/core/internal";

function buildDelegationHandler<EventType extends Event | UIEvent>(
  selector: string,
  handler: (ev: EventType, matchedTarget: HTMLElement) => void
) {
  return (ev: EventType) => {
    let matchedChild = elementClosest(ev.target as HTMLElement, selector);

    if (matchedChild) {
      handler.call(matchedChild, ev, matchedChild);
    }
  };
}

function listenBySelector(
  container: HTMLElement,
  eventType: string,
  selector: string,
  handler: (ev: Event, matchedTarget: HTMLElement) => void
) {
  let attachedHandler = buildDelegationHandler(selector, handler);

  container.addEventListener(eventType, attachedHandler);

  return () => {
    container.removeEventListener(eventType, attachedHandler);
  };
}

export class EventDblClicking extends Interaction {
  constructor(settings: InteractionSettings) {
    super(settings);

    this.destroy = listenBySelector(
      settings.el,
      "dblclick",
      ".fc-event", // on both fg and bg events
      this.handleSegDblClick
    );
  }

  handleSegDblClick = (ev: Event, segEl: HTMLElement) => {
    let { component } = this;
    let { context } = component;
    let seg = getElSeg(segEl);

    if (
      seg && // might be the <div> surrounding the more link
      component.isValidSegDownEl(ev.target as HTMLElement)
    ) {
      // our way to simulate a link click for elements that can't be <a> tags
      // grab before trigger fired in case trigger trashes DOM thru rerendering
      let hasUrlContainer = elementClosest(
        ev.target as HTMLElement,
        ".fc-event-forced-url"
      );
      let url = hasUrlContainer
        ? (hasUrlContainer.querySelector("a[href]") as any).href
        : "";

      context.emitter.trigger("eventDblClick", {
        el: segEl,
        event: new EventImpl(
          component.context,
          seg.eventRange?.def,
          seg.eventRange?.instance
        ),
        jsEvent: ev as MouseEvent, // Is this always a mouse event? See #4655
        view: context.viewApi,
      } as EventClickArg);

      if (url && !ev.defaultPrevented) {
        window.location.href = url;
      }
    }
  };
}

export default createPlugin({
  name: "EventDblClicking",
  componentInteractions: [EventDblClicking],
  listenerRefiners: {
    eventDblClick: identity as Identity<(arg: EventClickArg) => void>,
  },
});
