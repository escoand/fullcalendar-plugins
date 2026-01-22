import { createPlugin } from "@fullcalendar/core/index.js";
import { CalendarContext } from "@fullcalendar/core/internal.js";
// @ts-expect-error
import css from "./switcher.css";

const CLASS_HIDE_EMPTY = "fc-hide-empty";

class SwitcherPlugin {
  private _context: CalendarContext;
  private _rootEl: HTMLElement;

  constructor(context: CalendarContext) {
    this._context = context;
    this._rootEl = context.calendarApi.el;

    context.calendarApi.setOption("customButtons", {
      ...context.calendarApi.getOption("customButtons"),
      switcher: {
        text: "\u2611",
        click: this._clickHandler.bind(this),
      },
    });
  }

  private _clickHandler() {
    const wrapper = this._rootEl.appendChild(
      document.createElement("div")
    ) as HTMLElement;

    wrapper.classList = "fc-switcher";
    wrapper.appendChild(document.createElement("style")).textContent = css;

    const modal = wrapper.appendChild(document.createElement("div"));

    this._context.calendarApi.getEventSources().forEach((source) => {
      const label = modal.appendChild(document.createElement("label"));
      const option = label.appendChild(document.createElement("input"));
      option.checked = source.internalEventSource.ui.display !== "none";
      option.style.accentColor = source.internalEventSource.ui.backgroundColor;
      option.type = "checkbox";
      option.addEventListener("change", (ev: Event) => {
        source.internalEventSource.ui.display =
          ev.target?.checked !== true
            ? "none"
            : source.internalEventSource._raw.display;
        this._context.calendarApi.changeView(
          this._context.calendarApi.view.type
        );
      });
      label.append(
        source.internalEventSource.extendedProps.name ||
          `Unnamed (#${source.internalEventSource.sourceId})`
      );
    });

    // empty lines
    if (this._context.getCurrentData().viewApi.type === "multiCol") {
      modal.appendChild(document.createElement("hr"));
      const labelEmpty = modal.appendChild(document.createElement("label"));
      const checkEmpty = labelEmpty.appendChild(
        document.createElement("input")
      );
      labelEmpty.append(
        this._context.options.hideEmptyLinesText || "Hide empty lines"
      );
      checkEmpty.checked = this._rootEl?.classList.contains(CLASS_HIDE_EMPTY);
      checkEmpty.type = "checkbox";
      checkEmpty.addEventListener("change", (ev: Event) => {
        if (!ev.target?.checked) {
          this._rootEl.classList.remove(CLASS_HIDE_EMPTY);
        } else {
          this._rootEl.classList.add(CLASS_HIDE_EMPTY);
        }
      });
    }

    const buttons = modal.appendChild(document.createElement("div"));
    buttons.classList = "buttons";

    const closeButton = buttons.appendChild(document.createElement("button"));
    closeButton.classList.add("fc-button", "fc-button-primary");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () =>
      wrapper?.parentNode?.removeChild(wrapper)
    );
  }
}

export default createPlugin({
  name: "SwitcherPlugin",
  contextInit: (context) => new SwitcherPlugin(context),
  optionRefiners: {
    hideEmptyLinesText: (arg) => arg,
  },
});
