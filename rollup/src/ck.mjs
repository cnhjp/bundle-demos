export default function () {
  import("./utils.mjs").then(({ default: utils }) =>
    console.log(utils.add(1, 2))
  );
}
