const typescript = require("@rollup/plugin-typescript");
const myPlugin = require("./plugins/my-plugin.js");

module.exports = {
  input: "src/index.ts", // 入口文件。如果是多入口，可以是一个数组或对象；单入口可以是字符串
  external: ["lodash"], // 外部依赖，不会打包到 bundle 中
  plugins: [myPlugin(), typescript()], // 插件，构建module graph时使用
  output: {
    dir: "dist", // 生成文件所在目录，适用于多入口文件打包
    // file: "dist/bundle.js", // 生成的 bundle 的文件名及目录，适用于单入口文件打包
    format: "es", // amd, cjs, es, iife, umd, system
    globals: "baz", // 指定 iife 模式下全局变量的名称
    name: "foo", // 指定 iife 模式下的函数名称
    assetFileNames: "assets/[name]-[hash][extname]", // 输出的资源文件名
    banner: "/* banner */", // 输出文件 banner
    footer: "/* footer */", // 输出文件 footer
    chunkFileNames: "[name]-[hash].js", // 输出的 chunk 文件名
    entryFileNames: "[name]-[hash].js", // 输出的 entry 文件名
    inlineDynamicImports: false, // 是否将动态导入的模块打包到 bundle 中
    intro: "/* intro */", // 要添加到 chunk code 顶部 的代码，可用于变量注入
    outro: "/* outro */", // 要添加到 chunk code 底部 的代码，可用于变量注入
    manualChunks: {},
    // 自定义 chunk 分离规则，类似于 webpack 的 splitChunks 规则，将匹配的 module 分离到指定 name 的 chunks 中。
    // manualChunks 可以是一个对象，也可以是一个函数。如果是一个对象，key 为自定义 chunk 的 name， value 是一个 id 数组，表示要分配到自定义 chunk 的 module。
    // 如果是一个函数，入参为 module id，返回值为自定义 chunk 的 name。 rollup 会遍历模块依赖图，将匹配 manualChunks 函数的 module 分配到对应的自定义 chunks 中。
    // 分配到 manualChunks 中的 modules 中如果存在懒加载 module，懒加载 module 也会单独分离到 async chunk 中
    preserveModules: false,
    // rollup 默认的 chunk 分离规则将模块依赖图分离为尽可能少的 chunk。一个单页应用最后的分离结果为:一个 main chunk，多个懒加载 module 为 async chunk，多个根据 manualChunks 规则生成自定义 chunks。
    // 而 preserveModules 的分离过程正好相反。如果将 preserveModules 设置为 true， rollup 会将每个 module 分离为一个单独的 chunk。
    // preserveModules 需要配合 format 一起使用。
  },
};
