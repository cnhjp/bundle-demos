import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.mjs",
  external: ["lodash-es"],
  output: [
    { file: "dist/index.js", format: "cjs" },
    {
      file: "dist/index.min.js",
      format: "esm",
      plugins: [terser()],
    },
    {
      dir: "chunks",
      format: "esm",
      entryFileNames: "[name]-[hash].js",
      chunkFileNames: "[name]-[hash].js",
    },
  ],
  plugins: [json()],
};
