# rollup

## 插件

```js
export default   {
    name: 'rollup-plugin-xxxx',
    options: () => { ... },
    resolveId: () => { ... },
    load: () => { ... },
    ...
}
```

插件要有一个清晰的名称和 rollup-plugin-前缀；

在 package.json 中要包含 rollup-plugin 关键字；

插件应该是被测试的；

尽可能的使用异步方法；

如果可能，请确保您的插件输出正确的源映射；

### rollup hook 按执行顺序分类

1. async，异步 hook.
2. first - 如果有多个 plugin 实现了这个 hook，这些 hook 会按序执行，直到一个 hook 返回不是 null 或者 undefined 的值，即如果某个 hook 返回不是 null 或者 undefined 的值，那么后续的同类型的 hook 就不会执行了。
3. sequential - 如果有多个 plugin 实现了这个 hook，这些 hook 会按照 plugin 的顺序按序执行。如果一个 hook 是异步的，那么后续的 hook 会等待当前 hook 执行完毕才执行。上一个 hook 返回的结果会作为下一个 hook 的入参。
4. parallel - 如果有多个 plugin 实现了这个 hook，这些 hook 会按照 plugin 的顺序按序执行。如果一个一个 hook 是异步的，那么后续的 hook 将会并行执行，而不是等待当前的 hook，即 parallel 类型的 hook 之间不相互依赖。

针对 parallel 的 hook，vite(或者 rollup) 会采用一个 promise.all，等所有的 parallel hook 处理完毕以后，开始处理下一类型的 hook。

### rollup hook 按执行阶段分类

1.
