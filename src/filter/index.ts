import dayjs from 'dayjs'
// 相对时间，语言国际化
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { storeToRefs } from 'pinia'
import { appStore } from '@/store'
import type { App } from 'vue'

export const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)
export const relativeTime = (val) => {
  const { language } = storeToRefs(appStore.useBaseStore)
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(language.value === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app: App<Element>) => {
  app.config.globalProperties.$filters = { dataFilter, relativeTime }
}
