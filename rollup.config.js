import { babel } from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

const plugins = [
  babel({
    presets: ["@babel/preset-env"],
  }),
  terser(),
  serve({ open: true }),
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
