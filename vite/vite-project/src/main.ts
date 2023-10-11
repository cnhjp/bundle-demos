import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import foo from "virtual:test"

console.log(foo)

createApp(App).mount('#app')
