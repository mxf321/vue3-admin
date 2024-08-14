import { createI18n } from 'vue-i18n'
import enLocale from './lang/en'
import zhLocale from './lang/zh'

import { createPinia } from 'pinia'
import { useBaseStore } from '@/store'

const messages = {
  en: {
    msg: { ...enLocale }
  },
  zh: {
    msg: { ...zhLocale }
  }
}

const i18n = createI18n({
  // 使用 composition api
  legacy: false,
  // 全局使用t 函数
  globalInjection: true,
  //   locale: language.value,
  locale: useBaseStore(createPinia()).language,
  messages
})

export default i18n
