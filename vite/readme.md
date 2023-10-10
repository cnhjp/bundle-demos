# vite

## 预构建过程

Vite 的预构建过程主要包括以下步骤 ²³⁵：

1. **启动预构建**：当你首次启动 Vite 时，Vite 在本地加载你的站点之前预构建了项目依赖 ²。默认情况下，Vite 会将 `package.json` 中生产依赖 `dependencies` 的部分启用依赖预构建 ³。

2. **分析入口**：Vite 会扫描你的源码，并自动寻找引入的依赖项（即 "bare import"，表示期望从 `node_modules` 解析），并将这些依赖项作为预构建包的入口点 ⁵。

3. **执行预构建**：预构建通过 esbuild 执行，所以它通常非常快 ⁵。Vite 会先对该依赖进行构建，然后将构建后的文件缓存在内存中（`node_modules/.vite` 文件下）³。

4. **处理新依赖**：在服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面 ⁵。

5. **自定义行为**：在 `vite.config.js` 文件中配置 `optimizeDeps` 选项可以选择需要或不需要进行预构建的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预构建 ³。在启动时添加 `--force` options，可以用来强制重新进行依赖预构建 ³。

希望这个答案对你有所帮助！

源: 与必应的对话， 2023/10/10
(1) 依赖预构建 | Vite 官方中文文档. https://cn.vitejs.dev/guide/dep-pre-bundling.html.
(2) Vite 依赖预构建，缩短数倍的冷启动时间 | 源码解读 - 掘金. https://bing.com/search?q=vite%e7%9a%84%e9%a2%84%e6%9e%84%e5%bb%ba%e8%bf%87%e7%a8%8b.
(3) 依赖预构建 {#dependency-pre-bundling} | Vite 中文网. https://vitejs.cn/guide/dep-pre-bundling.html.
(4) 详解 Vite 预构建流程 - 掘金. https://juejin.cn/post/7090201071464742949.
(5) Vite 原理学习之按需编译\_vite/client-CSDN 博客. https://blog.csdn.net/s1879046/article/details/122180170.

## 什么情况执行预构建

Vite 会在以下情况下执行预构建：

1. **首次启动**：当你首次启动 Vite 时，Vite 在本地加载你的站点之前预构建了项目依赖。

2. **新的依赖关系导入**：在服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面。

3. **强制预构建**：在启动时添加 `--force` options，可以用来强制重新进行依赖预构建。

4. **自定义配置**：在 `vite.config.js` 文件中配置 `optimizeDeps` 选项可以选择需要或不需要进行预构建的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预构建。

希望这个答案对你有所帮助！

## 如何在 Vite 中配置依赖的预构建行为？

在 Vite 中，你可以通过配置 `vite.config.js` 文件中的 `optimizeDeps` 选项来自定义依赖的预构建行为。这个选项可以让你：

- 使用 `optimizeDeps.include` 来指定需要预构建的依赖名称，例如 `['lodash-es', 'react']`。
- 使用 `optimizeDeps.exclude` 来指定不需要预构建的依赖名称，例如 `['vue']`。
- 使用 `optimizeDeps.esbuildOptions` 来传递额外的选项给 esbuild，例如添加一个自定义的插件。
- 使用 `--force` 命令行选项来强制重新进行依赖预构建，无论缓存是否有效。

你可以参考 [Vite 官方文档](^1^) 来了解更多关于依赖预构建的信息。希望这个答案对你有所帮助！

源: 与必应的对话， 2023/10/10
(1) 依赖预构建 | Vite 官方中文文档. https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html.
(2) 依赖预构建 | Vite 官方中文文档. https://cn.vitejs.dev/guide/dep-pre-bundling.html.
(3) 依赖预构建 | Vite 官方中文文档. https://bing.com/search?q=Vite+%e9%85%8d%e7%bd%ae%e4%be%9d%e8%b5%96%e9%a2%84%e6%9e%84%e5%bb%ba.
(4) Vite 依赖预构建，缩短数倍的冷启动时间 | 源码解读 - 掘金. https://juejin.cn/post/6930407545374785543.

## 对于需要预构建和不需要预构建的依赖，vite 会如何分别处理

根据当前网页的内容，我为你生成了以下的回答：

对于需要预构建和不需要预构建的依赖，vite 会有不同的处理方式：

- 需要预构建的依赖是指那些以 CommonJS 或 UMD 规范提供的依赖，或者那些包含很多内部模块的 ESM 依赖。vite 会使用 esbuild 将这些依赖转换为单个 ESM 模块，并缓存到 node_modules/.vite 目录下。这样可以提高兼容性和性能，减少浏览器请求和解析的开销。
- 不需要预构建的依赖是指那些已经是有效的 ESM 模块，并且很小的依赖。vite 会直接将这些依赖作为原生 ES 模块加载，让浏览器处理它们。这样可以避免不必要的打包和转换，保持模块的原始结构和特性。

你可以通过配置 optimizeDeps 选项来自定义哪些依赖需要或不需要预构建。你也可以使用 --force 命令行选项来强制重新进行依赖预构建。希望这个答案对你有所帮助！

源: 与必应的对话， 2023/10/10
(1) 依赖预构建 | Vite 官方中文文档. https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html.
(2) 依赖预构建 | Vite 官方中文文档. https://cn.vitejs.dev/guide/dep-pre-bundling.html.
(3) 依赖预构建 {#dependency-pre-bundling} | Vite 中文网. https://vitejs.cn/guide/dep-pre-bundling.html.
(4) vite 依赖预构建 - 掘金. https://juejin.cn/post/7218129062745178168.

## 预构建和打包的关系

预构建和打包是两个在前端工程中常见的概念，它们都是为了优化代码和提高应用的性能。这两者之间有一定的关联，但也有各自的特点。

**预构建**是在开发阶段进行的，主要目标是优化开发体验和提高开发效率 ¹²。当你首次启动开发工具（如 Vite）时，它会在本地加载你的站点之前预构建项目依赖 ²。这个过程有两个主要目的：一是兼容性，将 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块 ²；二是性能，将那些具有许多内部模块的 ESM 依赖项转换为单个模块，以提高后续页面的加载性能 ²。

**打包**则是在生产阶段进行的，主要目标是优化最终用户的体验 ⁴。打包工具（如 webpack）会将多个 JavaScript 文件打包在一起，生成一个或多个 bundle⁴。这样做可以减少 HTTP 请求的数量，提高应用加载速度。同时，打包过程中还会进行代码压缩、混淆等优化操作，以减小文件大小和提高运行效率 ⁴。

总的来说，预构建和打包都是前端工程中重要的步骤，它们共同作用于代码的不同阶段，以提高开发效率和用户体验。

源: 与必应的对话， 2023/10/10
(1) 快速理解 Vite 的依赖预构建 - 掘金. https://juejin.cn/post/7139430132762017800.
(2) 依赖预构建 | Vite 官方中文文档. https://cn.vitejs.dev/guide/dep-pre-bundling.html.
(3) 依赖管理 | webpack 中文文档. https://webpack.docschina.org/guides/dependency-management/.
(4) 与其它非打包解决方案比较 | Vite. https://www.vitejs.net/guide/comparisons.html.
(5) undefined. https://unpkg.com/lodash-es/lodash.js.

## vite 中预构建和打包分别使用什么工具

在 Vite 中，预构建和打包使用的工具如下：

- **预构建**：Vite 在开发模式中使用**esbuild**进行依赖预构建 ⁴。Esbuild 是用 Go 编写的，比以 JavaScript 编写的打包器预构建依赖快 10-100 倍 ⁵。
- **打包**：Vite 使用**Rollup**打包你的代码 ¹。在生产构建中，将使用@rollup/plugin-commonjs⁴。

这两种工具都能够提供快速、轻量级的开发体验 ⁶。希望这个信息对你有所帮助！

源: 与必应的对话， 2023/10/10
(1) 依赖预构建 | Vite 官方中文文档. https://cn.vitejs.dev/guide/dep-pre-bundling.html.
(2) 探索 Vite 开发服务核心工具之：预优化(Pre-Bundling)-腾讯云 .... https://cloud.tencent.com/developer/article/1945418.
(3) 开始 | Vite 官方中文文档. https://vitejs.cn/vite3-cn/guide/.
(4) Vite 组件化开发 - 知乎. https://zhuanlan.zhihu.com/p/639644303.
(5) Vite | 下一代的前端工具链. https://cn.vitejs.dev/.
(6) 依赖预构建 | Vite 官方中文文档. https://bing.com/search?q=Vite%e9%a2%84%e6%9e%84%e5%bb%ba%e5%92%8c%e6%89%93%e5%8c%85%e4%bd%bf%e7%94%a8%e7%9a%84%e5%b7%a5%e5%85%b7.
(7) undefined. https://github.com/vitejs/vite.git.

## 为什么打包阶段不用 esbuild

Vite 在打包阶段选择使用 Rollup 而不是 esbuild 的原因主要有以下几点 ²：

- **代码分割和 CSS 处理**：Esbuild 的一些针对构建应用的重要功能，特别是代码分割和 CSS 处理，仍然在持续开发中 ²。而 Rollup 在这些方面更加成熟和灵活 ²。

- **兼容性**：Esbuild 不能很好地支持 ES6+转 ES5²。这可能会导致一些兼容性问题，特别是在需要支持较旧浏览器的项目中。

- **插件生态**：Esbuild 的插件生态相比于 Rollup 还有一些差距 ²。许多常用的 Babel 插件，如 babel-plugin-import，没有很好的方法过渡到 Esbuild 中 ²。

- **AST 操作**：为了保证 Esbuild 的编译效率，Esbuild 没有提供 AST（抽象语法树）的操作能力 ²。这意味着一些通过 AST 处理代码的工具无法与 Esbuild 很好地集成。

因此，虽然 Esbuild 在开发环境中的预构建和文件编译方面表现出色，但在生产环境的打包阶段，Rollup 由于其成熟性、灵活性和强大的插件生态，仍然是更好的选择 ²。

源: 与必应的对话， 2023/10/10
(1) Vite 源码（一）ESbuild 使用 - 掘金. https://juejin.cn/post/7043777969051058183.
(2) 构建生产版本 | Vite 官方中文文档. https://cn.vitejs.dev/guide/build.html.
(3) Building for Production | Vite. https://vitejs.dev/guide/build.
(4) undefined. https://rollupjs.org/configuration-options/.
(5) undefined. https://www.example.com/v1.
