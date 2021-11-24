import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";

export default {
  input: "src/yearview.js",
  output: {
    compact: true,
    dir: "dist/",
    format: "iife",
    name: "FullCalendar.YearView",
    sourcemap: true,
  },
  plugins: [
    babel({
      presets: ["@babel/preset-env"],
    }),
    terser(),
    serve({ open: true }),
  ],
};
