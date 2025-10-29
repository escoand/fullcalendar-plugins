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
  createOutput("src/caldav.ts", "CalDavPlugin"),
  createOutput("src/claim.ts", "ClaimPlugin"),
  createOutput("src/loading.ts", "LoadingPlugin"),
  createOutput("src/multicol.ts", "MultiColumnPlugin"),
  createOutput("src/yearview.ts", "YearViewPlugin"),
];
