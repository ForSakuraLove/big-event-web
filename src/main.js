import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-cn.js'
import Particles from "particles.vue3"


const app = createApp(App)
const pinia = createPinia()
const persistedstate = createPersistedState()
pinia.use(persistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale})
app.use(Particles)
app.mount('#app')
