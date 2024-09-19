import { Calendar, PluginDefInput, createPlugin } from "@fullcalendar/core";
import { CalendarContext, Dictionary } from "@fullcalendar/core/internal";
import "core-js/stable";
// @ts-expect-error
import css from "./loading.css";

class LoadingListener {
  el: HTMLElement;

  static build(name: string): PluginDefInput {
    const ll = new LoadingListener();
    return {
      name,
      contextInit: ll.contextInit.bind(ll),
      isLoadingFuncs: [ll.isLoadingFunc.bind(ll)],
    };
  }

  contextInit(context: CalendarContext): void {
    this.el = (context.calendarApi as Calendar).el;
    this.el.appendChild(document.createElement("style")).append(css);
  }

  isLoadingFunc(state: Dictionary): boolean {
    const isLoading = Object.values(state.eventSources as Dictionary).some(
      (src) => src.isFetching
    );
    if (isLoading) this.el.classList.add("loading");
    else this.el.classList.remove("loading");
    return isLoading;
  }
}

export default createPlugin(LoadingListener.build("LoadingPlugin"));
