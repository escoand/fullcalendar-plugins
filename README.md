# FullCalendar Plugins

Multiple https://fullcalendar.io plugins useable with just static HTML and JavaScript code for easy inclusion in existing web pages.

### CalDav plugin

Adds the ability to use CalDav URLs as `eventSource`.

### Loading plugin

Shows a loading indicator when any of the event sources is loading. This is especially useful when using the CalDav plugin.

### Multi column view plugin

Shows every `eventSource` not having `display:"background"` as a independend column.

![215787255-17d6b97b-a198-44cd-a5a7-ddbce1ce1a13](https://user-images.githubusercontent.com/428567/215788735-4fdf5bed-17c9-4e4b-a5d4-7308e3a171c5.png)

### Year view plugin

Shows a complete year in a grid view.

![215786400-33f88489-7a21-4e55-a991-8eabd6dd4e52](https://user-images.githubusercontent.com/428567/215788714-57d86bc0-81e2-4917-94e8-938c2ca0b637.png)

## Demo

Here is a working demo of all the view plugins: https://fullcalendar-plugins.vercel.app/

## Usage

Easiest way is to use a CDN deployment like this:

```html
<script src="https://cdn.jsdelivr.net/npm/fullcalendar"></script>
<script src="https://cdn.jsdelivr.net/gh/escoand/fullcalendar-plugins/dist/caldav.js"></script>
<script src="https://cdn.jsdelivr.net/gh/escoand/fullcalendar-plugins/dist/loading.js"></script>
<script src="https://cdn.jsdelivr.net/gh/escoand/fullcalendar-plugins/dist/multicol.js"></script>
<script src="https://cdn.jsdelivr.net/gh/escoand/fullcalendar-plugins/dist/yearview.js"></script>
<div id="calendar"></div>
<script>
  var cal = new FullCalendar.Calendar(document.getElementById("calendar"), {
    plugins: [CalDavPlugin, LoadingPlugin, MultiColumnPlugin, YearViewPlugin],
    headerToolbar: {
      center: "title",
      left: "prev,next today",
      right: "multiCol,yearView",
    },
    // since version 1.2 there are 3 ways to add CalDav calendars
    eventSources: [
      // 1. add and fetch config (name and color) via CalDav
      {
        url: "https://example.com/caldav/",
        format: "caldav",
        // custom settings or override name and color
      },
      // 2: add CalDav calendar and disable CalDav config fetch
      {
        url: "https://example.com/caldav/",
        format: "caldav",
        name: "My CalDav",
        fetchConfig: false,
        // ...
      },
    ],
  });
  cal.render();
  // 3. add calendar asyncally and fetch config via CalDav
  // (decrepated and will be removed)
  CalDavPlugin.initSourceAsync(cal, "https://example.com/caldav/", {
    // custom settings ...
  });
</script>
```

## Development

- checkout the source code
- install the dependencies with `npm install`
- start development with `npm start`

# ToDo

- more documentation
