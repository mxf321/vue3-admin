import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useLoadStore = defineStore('load', () => {
  const isLoadRouters: Ref<boolean> = ref<boolean>(false)

  const setAsyncRoutesMark: (val: boolean) => void = (val: boolean) => {
    isLoadRouters.value = val
  }

  return { isLoadRouters, setAsyncRoutesMark }
})
// 热更新 编辑你的 store，并直接在你的应用中与它们互动，
// 而不需要重新加载页面，允许你保持当前的 state、并添加甚至删除 state、action 和 getter。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadStore, import.meta.hot))
}
