import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'
import testPlugin from './plugins/vite-plugin-test.ts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin(), {
    // @ts-ignore
    ...testPlugin({ plugin: 'test' }),
    enforce: 'pre'
  }],
  base: '/foo',
  define: {
    'Math.PI': '3.14'
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: 'nested/index.html'
      },
      external: [
        // 'vue',
      ],
    },
    // lib: {
    //   entry: resolve(__dirname, 'lib/main.ts'),
    //   name: 'MyLib',
    //   fileName: (format) => `my-lib.${format}.js`
    // }
  }
})
