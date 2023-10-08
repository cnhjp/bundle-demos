import myExample from "./plugins/rollup-plugin-my-example.mjs";

export default {
  input: "virtual-module",
  output: {
    format: "es",
  },
  plugins: [myExample()],
};
