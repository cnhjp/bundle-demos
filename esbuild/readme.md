# esbuild

提供了两个 api：transform 和 build。

## transform

通过这个 api 可以将 ts、jsx、tsx 格式的内容转化为 js 格式的内容。 transfrom 只负责文件内容转换，并不会生成一个新的文件

## build

根据指定的单个或者多个入口，分析依赖，并使用 loader 将不同格式的内容转化为 js 内容，生成一个 bundle 文件

## 自定义插件

```ts
export default {
    name: 'xxx',
    setup: (build) => {
        build.onResolve({ filter: '', namespace: '' }, args => { ...});
        build.onLoad({ filter: '', namespace: ''}, args => { ... });
        build.onStart(() => { ... });
        build.onEnd(() => { ... });
    }
}
```

**onResolve**
解析 url 是调用，可自定义 url 如何解析。如果 callback 有返回 path，后面的 callback 将不会执行。
所有的 onResolve callback 将按照对应的 plugin 注册的顺序执行。

**onLoad**
加载模块时调用，可自定义模块如何加载。 如果 callback 有返回 contents，后面的 callback 将不会执行。
所有的 onLoad callback 将按照对应的 plugin 注册的顺序执行。

**onStart**
每次 build 开始时都会触发，没有入参，因此不具有改变 build 的能力。
多个 plugin 的 onStart 并行执行。

**onEnd**
每次 build 结束时会触发，入参为 build 的结果，可对 result 做修改。
多个 plugin 的 onEnd 是按序执行的。

## 优缺点

### 优点

极快的构建速度：esbuild 的构建速度非常快，通常比其他构建工具快数倍甚至数十倍。这是因为 esbuild 使用了高效的并行算法和优化技术，以及 Go 语言的高性能编译器。

支持多种文件类型：esbuild 支持多种文件类型，包括 JavaScript、TypeScript、JSX、CSS、JSON 等。同时，esbuild 还支持自定义加载器和插件，以便处理更多类型的文件。

支持多种输出格式：esbuild 支持多种输出格式，包括 ES6 模块、CommonJS 模块、UMD 模块、IIFE 模块等。同时，esbuild 还支持自定义输出格式和文件名，以便满足不同的需求。

支持多种构建选项：esbuild 支持多种构建选项，包括压缩、代码分割、Tree Shaking、代码转换等。同时，esbuild 还支持自定义构建选项和插件，以便进行更高级的构建操作。

易于使用和集成：esbuild 的 API 非常简单易用，只需要几行代码就可以完成一个基本的构建操作。同时，esbuild 还提供了多种集成方式，包括命令行工具、Node.js 模块、Webpack 插件等，以便与其他工具和框架进行集成。

### 缺点

无法修改 ast，防止暴露过多的 api 而影响性能；

不支持自定义代码拆分(拆分出来的 chunk： initial chunk、async chunk、runtime chunk)

产物无法降级到 es5 之下；

## 为什么快

并行算法：esbuild 使用了高效的并行算法，可以同时处理多个文件，从而提高了构建速度。

AST 优化：esbuild 使用了一些 AST 优化技术，例如基于哈希表的 AST 节点缓存、基于哈希表的文件缓存等，可以减少重复的解析和转换操作，从而提高了构建速度。

零拷贝：esbuild 使用了零拷贝技术，可以直接在内存中操作文件内容，避免了不必要的磁盘读写操作，从而提高了构建速度。

Go 语言编译器：esbuild 使用 Go 语言编写，可以利用 Go 语言的高性能编译器和垃圾回收机制，从而提高了构建速度。
