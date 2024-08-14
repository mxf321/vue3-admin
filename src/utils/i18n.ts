import i18n from '@/i18n'
import { watch } from 'vue'

import { useBaseStore } from '@/store'
import { storeToRefs } from 'pinia'

const baseStore = useBaseStore()
const { language } = storeToRefs(baseStore)

export const generateTitle = (title: string) => {
  return i18n.global.t('msg.route.' + title)
}

// 监听语言变化，同时执行 cb
export function wacthSwitchLang(...cbs: Function[]) {
  watch(
    () => language.value,
    () => {
      cbs.forEach((cb) => cb(language.value))
    }
  )
}
