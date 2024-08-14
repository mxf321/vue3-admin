import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import * as variablesScss from '@/styles/variables.module.scss'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { generateNewStyle } from '@/utils/theme'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mainColorStartData: string = getItem(MAIN_COLOR) || DEFAULT_COLOR
    const mainColor: Ref<string> = ref<string>(mainColorStartData)

    const variables: any = ref(variablesScss)

    // const cssVar = computed(() => ({
    //   ...variables.value,
    //   ...generateNewStyle(getItem(MAIN_COLOR))
    // }))
    const cssVar = computed(() => ({
      ...variables.value,
      ...generateNewStyle(mainColor.value)
    }))

    const setMainColor: (newColor: string) => void = (newColor: string) => {
      mainColor.value = newColor
      variables.value.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }

    return { mainColor, variables, cssVar, setMainColor }
  },
  {
    persist: {
      key: 'theme', // Key 用于引用 storage 中的数据
      storage: localStorage // 将数据持久化到的 storage 中
    }
  }
)
// 热更新 编辑你的 store，并直接在你的应用中与它们互动，
// 而不需要重新加载页面，允许你保持当前的 state、并添加甚至删除 state、action 和 getter。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
