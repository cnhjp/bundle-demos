import { Plugin } from 'esbuild';
import fs from 'node:fs';

const myPlugin: Plugin = {
    name: 'my-plugin',
    setup(build) {
        build.onLoad({ filter: /\.(js|ts|jsx|tsx)$/ }, async (args) => { // 只对js/ts/jsx/tsx文件进行操作
            const contents = await fs.promises.readFile(args.path, 'utf8');
            const newContents = `// my-plugin\n${contents}`;
            console.log(newContents)
            return { contents: newContents, loader: 'file' };
        });
    },
};

export default myPlugin;