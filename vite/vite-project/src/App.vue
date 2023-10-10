<script setup lang="ts">
import style from "./style.css?inline";
import styleModule from "./style.module.css";
import url from "./url.jsft?raw";
import utils from "./utils.js?raw";
import json from "./data.json";
import { h, onMounted, createApp } from "vue";

console.log(style, typeof style, styleModule, typeof styleModule);
console.log(url, typeof url);
console.log(utils, typeof utils);
console.log(json, typeof json);
const modules = import.meta.glob("./modules/*", { eager: true });
console.log(modules, typeof modules["./modules/a.js"]);
(modules["./modules/a.js"] as { default: Function }).default();
// modules["./modules/a.js"]().then((res) => {
//   console.log(res);
// });

const worker = new Worker(new URL("./worker.js", import.meta.url));
console.log(worker, typeof worker);
worker.onmessage = (e) => {
  console.log("message: ", e.data);
};
worker.postMessage("hello worker");

const p = h("p", "This is a paragraph");
const div = h("div", { class: "red", key: 11, ref: "ref", a: "a" }, [p]);

console.log(div);

// div: VNode 渲染到
onMounted(() => {
  // 通过h函数创建的虚拟节点，可以通过render函数渲染到页面上
  const foo = document.querySelector("#foo");
  if (foo) {
    createApp({
      render() {
        return div;
      },
    }).mount(foo);
  }
});
</script>

<template>
  <div>hello 对对调</div>
  <div id="foo"></div>
</template>

<style scoped>
@import "./style.css";
.red {
  color: red;
}
</style>
