import esbuild from 'esbuild';
import fs from 'node:fs';

const code = fs.readFileSync('src/utils.ts', 'utf8');

const res = await esbuild.transform(code, {
    define: {
        'Math.PI': '3.14'
    }, // 替换代码中的常量
    loader: 'ts', // 调用对应loader解释对应类型文件，有ts、tsx、js、jsx、json、text、base64、file、dataurl、binary、default
    target: 'node14', // 目标平台，有chrome、firefox、safari、edge、node、electron等
    format: 'iife', // 打包后的目标格式，有iife、cjs、esm。platform为browser时，format默认为iife
    platform: 'node', // 打包后的平台，有browser、node、neutral
    minify: false, // 是否压缩，默认为false
    banner: 'console.log("banner")', // 在打包后的文件头部添加内容
    footer: 'console.log("footer")', // 在打包后的文件尾部添加内容
    globalName: 'globalName', // 为iife格式的文件指定全局变量名
});

console.log(res.code);