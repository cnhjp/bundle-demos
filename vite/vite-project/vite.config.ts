import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin()],
  base: '/foo',
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: 'nested/index.html'
      },
      // external: ['vue'],
    },
    // lib: {
    //   entry: resolve(__dirname, 'lib/main.ts'),
    //   name: 'MyLib',
    //   fileName: (format) => `my-lib.${format}.js`
    // }
  }
})
