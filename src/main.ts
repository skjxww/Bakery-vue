import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TopBar from './layouts/TopBar.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';

// createApp(App).use(router).mount('#app').component('Topbar',Topbar);
const app=createApp(App) as any;
app.component('TopBar',TopBar);
app.use(router);
// app.use(Antd);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app');