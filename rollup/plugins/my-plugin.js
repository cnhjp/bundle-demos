// rollup-plugin-my-plugin.js
module.exports = () => ({
  name: "my-plugin", // 这个名字将会在警告和错误中显示

  // 在生成包之前触发
  buildStart() {
    console.log("开始构建...");
  },

  // 在生成包之后触发
  buildEnd() {
    console.log("构建结束.");
  },

  // 转换源码
  transform(code, id) {
    if (id.endsWith(".js") || id.endsWith(".ts")) {
      return code.replaceAll("console.log(", "alert(");
    }
  },
});
