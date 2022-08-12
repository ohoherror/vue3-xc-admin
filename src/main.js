import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/scss/index.scss'
import store from "./store"

const app = createApp(App);
app.use(router);

app.use(store)

app.use(ElementPlus)

app.mount('#app');
