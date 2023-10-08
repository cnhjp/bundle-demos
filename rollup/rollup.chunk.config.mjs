import json from "@rollup/plugin-json";

export default {
  input: "src/ck.mjs",
  external: ["lodash-es"],
  output: {
    dir: "chunks",
    format: "cjs",
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "[name]-[hash].js",
  },
  plugins: [json()],
};
