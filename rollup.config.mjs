import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import css from "rollup-plugin-import-css";
import serve from "rollup-plugin-serve";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const globals = {
  "@fullcalendar/core": "FullCalendar",
  "@fullcalendar/core/internal": "FullCalendar.Internal",
  "@fullcalendar/core/preact": "FullCalendar.Preact",
};

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    extensions,
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          corejs: "3.27",
          useBuiltIns: "entry",
        },
      ],
    ],
    targets: "defaults",
  }),
  css({ minify: true }),
  terser(),
  // http server if watch mode
  process.env.ROLLUP_WATCH && serve({ open: true, openPage: "/samples/" }),
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
  createOutput("src/multicol.ts", "MultiColumnPlugin"),
  createOutput("src/yearview.ts", "YearViewPlugin"),
];
