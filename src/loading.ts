import { createPlugin } from "@fullcalendar/core";
import { CalendarListenerRefiners } from "@fullcalendar/core/internal";
import "core-js/stable";

class LoadingListener implements CalendarListenerRefiners {
  constructor() {
    console.log("constructor", ...arguments);
  }

  loading(isLoading: boolean) {
    let loading;
    if (this.el.childNodes.length == 2) {
      loading = this.el.appendChild(document.createElement("div"));
      loading.setAttribute("id", "loading");
      loading.classList.add("loading");
      loading.innerHTML = "<h3>Bitte warten ...</h3>";
    } else {
      loading = this.el.lastChild;
    }
    if (loading) {
      loading.style.display = isLoading ? "block" : "none";
    }
  }
}

export default createPlugin({
  name: "LoadingPlugin",
  listenerRefiners: { loading: LoadingListener },
});
