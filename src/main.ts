import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TopBar from './layouts/TopBar.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';

// createApp(App).use(router).mount('#app').component('Topbar',Topbar);
const app=createApp(App) as any;
app.component('TopBar',TopBar);

// 使用 ElementPlus 插件
app.use(ElementPlus);
app.use(router);
// app.use(Antd);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 将 axios 挂载到全局属性上
app.config.globalProperties.$axios = axios;
// 配置 axios 的 baseURL
axios.defaults.baseURL = '/api';
app.mount('#app');