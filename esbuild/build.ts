import esbuild from 'esbuild';
import myPlugin from './plugins/my-plugin.ts';

esbuild.build({
    define: {
        'Math.PI': '3.14'
    }, // 替换代码中的常量
    loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
        '.js': 'js',
        '.jsx': 'jsx',
        '.json': 'json',
        '.text': 'text',
        '.base64': 'base64',
        '.file': 'file',
        '.dataurl': 'dataurl',
        '.binary': 'binary',
        '.default': 'default',
        '.jpg': 'file',
    }, // 调用对应loader解释对应类型文件，有ts、tsx、js、jsx、json、text、base64、file、dataurl、binary、default
    target: 'node14', // 目标平台，有chrome、firefox、safari、edge、node、electron等
    format: 'cjs', // 打包后的目标格式，有iife、cjs、esm。platform为browser时，format默认为iife
    platform: 'node', // 打包后的平台，有browser、node、neutral
    minify: false, // 是否压缩，默认为false
    banner: {
        js: 'console.log("banner")',
        css: 'body{color: red;}'
    }, // 在打包后的文件头部添加内容
    footer: {
        js: 'console.log("footer")',
        css: 'body{color: blue;}'
    }, // 在打包后的文件尾部添加内容
    globalName: 'globalName', // 为iife格式的文件指定全局变量名
    // 下面是build独有的参数
    entryPoints: ['src/index.ts', 'src/assets/*'],
    // 入口文件，可以是数组或对象。
    // 数组时，当数组元素只有一个时，是单入口打包，生成的 bundle 只有一个；当数组元素有多个时，是多入口打包，生成的 bundle 有多个；
    // 对象时，key 为 outfile 的文件名， value 为入口文件的文件名。
    // entryPoints: {
    //     'index': 'src/index.ts',
    //     'utils': 'src/utils.ts',
    // },
    entryNames: '[name]-[hash]', // 入口文件的文件名，只有当 entryPoints 为对象时才生效。用于控制每个入口文件对应的输出文件的文件名，可通过带有占位符的模板配置输出路径
    bundle: true, // 是否将所有文件打包成一个文件，即依赖的文件是否打包到一起，默认false
    external: ['src/foo.ts'], // 外部依赖，不会打包到bundle中
    outdir: 'dist', // 输出目录
    // outfile: 'dist/index.js', // 输出文件，如果是多入口打包构建，则不能使用，此时必须是 outdir。不能与 outdir 同时使用
    sourcemap: true, // 是否生成 sourcemap 文件。可选值为 true、false、"inline"、"external"。默认为 false
    // linked：生成 sourcemap 文件，但不会在 bundle 中包含 sourcemap 的内容，而是在 bundle 同目录下生成一个 sourcemap 文件
    // inline：生成 sourcemap 文件，并在 bundle 中包含 sourcemap 的内容
    // external：不会生成 sourcemap 文件，但会在 bundle 同目录下生成一个 sourcemap 文件
    // splitting: true, // 是否拆分代码，拆分代码可以提升加载速度，但会增加文件数量，只在format：esm时生效。默认为 false。
    // chunkNames: '[name]-[hash]', // 拆分代码的文件名，可通过带有占位符的模板配置输出路径。与 splitting 配合使用
    // watch: never, // 是否监听文件变化，当文件发生变化时，会重新打包。默认为 false
    write: true, // 是否将文件写入磁盘，默认为 true。如果为 false，则不会写入磁盘，而是将文件内容返回给调用者
    assetNames: '[name]-[hash]', // 静态资源的文件名，可通过带有占位符的模板配置输出路径
    resolveExtensions: ['.js', '.ts', '.tsx', '.jsx', '.json'], // 解析文件时，会按照这个顺序依次解析文件，直到找到为止
    treeShaking: true, // 是否开启 tree shaking，默认为 false

    ////////////////
    plugins: [
        myPlugin
    ]
})