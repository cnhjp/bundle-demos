import { rollup } from "rollup";

const inputOptions = {
  input: "src/index.mjs",
  external: ["lodash-es"],
};

const outputOptions = {
  file: "dist/index.js",
  format: "cjs",
};

try {
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
} catch (err) {
  console.log("err: ", err);
}
