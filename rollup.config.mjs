import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import css from "rollup-plugin-import-css";
import serve from "rollup-plugin-serve";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    exclude: [/\/core-js\//],
    extensions,
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          corejs: "3.27",
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
