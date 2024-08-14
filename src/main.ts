import { createApp } from 'vue'
import App from './App.vue'
import pinia, { appStore, registerStore } from './store'
import setupStore from './store'
import router from '@/router/index.ts'

// 引入重置样式
import '@/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入自定义iocn
import installIcons from './icons/index'
// mock 数据
import './mock/index'
import i18n from '@/i18n/index'

// 导入路由鉴权
import './permission'
// 全局属性
import installFilter from '@/filter/index.ts'
// 局部打印 指令
import installDirective from '@/directives'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
// setupStore(app)
//安装pinia
app.use(pinia)
registerStore()

// 引入自定义icon
installIcons(app)
installFilter(app)
installDirective(app)

// i18n
app.use(i18n)
app.use(router)
app.mount('#app')
