// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)

// 8.130.20.11
//设置全局请求地址
let VUE_APP_BASE_DEV_API = 'http://localhost:8080'
let VUE_APP_BASE_PRODUCT_API = "http://8.130.20.11:8080"

//将axios实例绑定到$http属性上
app.config.globalProperties.$http = axios

//设置请求url
axios.defaults.baseURL = VUE_APP_BASE_DEV_API
//设请求头
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
//
axios.defaults.headers.post['Accept'] = 'application/json'


app.mount('#app')

