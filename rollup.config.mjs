import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import css from "rollup-plugin-import-css";
import serve from "rollup-plugin-serve";
import demoserver from "./demo/server.js";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const globals = {
  "@fullcalendar/core": "FullCalendar",
  "@fullcalendar/core/internal": "FullCalendar.Internal",
  "@fullcalendar/core/preact": "FullCalendar.Preact",
};

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({ babelHelpers: "bundled", extensions, targets: "defaults" }),
  css({ minify: true }),
  terser(),
  process.env.ROLLUP_WATCH &&
    serve({ contentBase: "dist", onListening: demoserver }),
];

const createOutput = (input, name) => ({
  external: Object.keys(globals),
  input,
  output: {
    compact: true,
    dir: "dist/",
    format: "iife",
    globals,
    name,
    sourcemap: true,
  },
  plugins,
});

export default [
  createOutput("src/auth/nextcloud.ts", "NextcloudAuth"),
  createOutput("src/auth/oauth2.ts", "Oauth2Auth"),
  createOutput("src/interaction/dblclick.ts", "EventDblClickPlugin"),
  createOutput("src/source/caldav.ts", "CalDavPlugin"),
  createOutput("src/view/loading.ts", "LoadingPlugin"),
  createOutput("src/view/multicol.ts", "MultiColumnPlugin"),
  createOutput("src/view/yearview.ts", "YearViewPlugin"),
];
