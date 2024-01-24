import './assets/main.css'
import { createApp } from 'vue'
import { store } from "./store/index"
import App from './App.vue'
import { vMaska } from 'maska'

createApp(App)
  .use(store)
  .directive("maska", vMaska)
  .mount('#app');
