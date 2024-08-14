import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW, DEFAULT_LANG } from '@/constant'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { tagsViewItemType } from '@/types/app'

export const useBaseStore = defineStore(
  'base',
  () => {
    // 折叠面板
    const sidebarOpened: Ref<boolean> = ref<boolean>(true)
    // language
    const languageStartData: string = getItem(LANG) || DEFAULT_LANG
    const language: Ref<string> = ref<string>(languageStartData)
    // tagsViewList
    const tagsViewListStartData: tagsViewItemType[] = getItem(TAGS_VIEW) || []
    const tagsViewList: Ref<tagsViewItemType[]> = ref<tagsViewItemType[]>(
      tagsViewListStartData
    )
    // mutations
    const triggerSidebarOpened: () => void = () => {
      sidebarOpened.value = !sidebarOpened.value
    }
    const setLanguage: (lang: string) => void = (lang: string) => {
      setItem(LANG, lang)
      language.value = lang
    }
    // 添加 tags
    const addTagsViewList: (tag: tagsViewItemType) => void = (
      tag: tagsViewItemType
    ) => {
      // 处理重复
      const isFind: tagsViewItemType | undefined = tagsViewList.value.find(
        (item: tagsViewItemType) => item.path === tag.path
      )
      if (!isFind) {
        tagsViewList.value.push(tag)
        setItem(TAGS_VIEW, tagsViewList.value)
      }
    }
    // 为指定的tag修改title
    const changeTagsView: ({
      index,
      tag
    }: {
      index: number
      tag: tagsViewItemType
    }) => void = ({ index, tag }) => {
      tagsViewList.value[index] = tag
      setItem(TAGS_VIEW, tagsViewList.value)
    }

    // tags 操作 {type:'other' |'right'|'left' }
    const removeTagsView: (payload) => tagsViewItemType[] | undefined = (
      payload
    ) => {
      switch (payload.type) {
        case 'index':
          tagsViewList.value.splice(payload.index, 1)
          break
        case 'other':
          tagsViewList.value.splice(
            payload.index + 1,
            tagsViewList.value.length - 1
          )
          tagsViewList.value.splice(0, payload.index)
          break
        case 'right':
          tagsViewList.value.splice(
            payload.index + 1,
            tagsViewList.value.length - 1
          )
          break
        default:
          return tagsViewList.value
      }
      setItem(TAGS_VIEW, tagsViewList.value)
    }

    return {
      sidebarOpened,
      language,
      tagsViewList,
      triggerSidebarOpened,
      setLanguage,
      addTagsViewList,
      changeTagsView,
      removeTagsView
    }
  },
  {
    persist: {
      key: 'base', // Key 用于引用 storage 中的数据
      storage: localStorage // 将数据持久化到的 storage 中
    }
  }
)
// 热更新 编辑你的 store，并直接在你的应用中与它们互动，
// 而不需要重新加载页面，允许你保持当前的 state、并添加甚至删除 state、action 和 getter。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBaseStore, import.meta.hot))
}
