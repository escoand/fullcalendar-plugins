import { createPlugin, EventClickArg } from "@fullcalendar/core";
import { CalendarContext, EventImpl } from "@fullcalendar/core/internal";
import EventDblClicking from "./interaction/EventDblClicking";

function onEventDblClick(arg: EventClickArg) {
  if (!isEditable(arg.event, "title")) {
    return;
  }
  const input = prompt(undefined, arg.event.title);
  if (input !== null && arg.event.title !== input) {
    arg.event.setProp("title", input);
  }
}

function isEditable(event: EventImpl, property: string) {
  return (
    event.display !== "background" &&
    (event.extendedProps[`${property.toLowerCase()}Editable`] === true ||
      event.source?.internalEventSource.extendedProps[
        `${property.toLowerCase()}Editable`
      ] === true)
  );
}

export default createPlugin({
  name: "TitleEditPlugin",
  deps: [EventDblClicking],
  contextInit: (context: CalendarContext) => {
    context.emitter.on("eventDblClick", onEventDblClick);
  },
});
