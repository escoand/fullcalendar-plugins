import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

const plugins = [
  resolve(),
  commonjs(),
  babel({
    exclude: [/\/core-js\//],
    presets: [
      [
        "@babel/preset-env",
        {
          corejs: "3.19",
          modules: false,
          useBuiltIns: "usage",
        },
      ],
    ],
  }),
  terser(),
  // http server if watch mode
  process.env.ROLLUP_WATCH && serve({ open: true }),
];

export default [
  {
    input: "src/caldav.js",
    output: {
      compact: true,
      dir: "dist/",
      format: "iife",
      name: "FullCalendar.CalDavSource",
      sourcemap: true,
    },
    plugins: plugins,
  },
  {
    input: "src/yearview.js",
    output: {
      compact: true,
      dir: "dist/",
      format: "iife",
      name: "FullCalendar.YearView",
      sourcemap: true,
    },
    plugins: plugins,
  },
];
