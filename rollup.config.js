import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

const plugins = [
  resolve(),
  commonjs(),
  typescript(),
  babel({
    babelHelpers: "bundled",
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
  css({ minify: true }),
  terser(),
  // http server if watch mode
  process.env.ROLLUP_WATCH && serve({ open: true }),
];

const createOutput = (input, name) => ({
  input,
  output: {
    compact: true,
    dir: "dist/",
    format: "iife",
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
