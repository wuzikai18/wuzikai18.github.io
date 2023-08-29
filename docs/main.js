import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import JsonExcel from "vue-json-excel3";





const app = createApp(App)
app.use(store)
app.use(router)

app.use(ElementPlus)
app.component("downloadExcel", JsonExcel);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
import 'virtual:windi.css'


import "./permission"

import "nprogress/nprogress.css"


import permission from "~/directives/permission.js"
app.use(permission)

app.mount('#app')
