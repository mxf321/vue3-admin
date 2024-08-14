<template>
  <div>
    <!-- 带有切换动画，并且具备组件缓存的 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { generateTitle, wacthSwitchLang } from '@/utils/i18n'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

import type { RouteRecordRaw } from 'vue-router'
import type { tagsViewItemType } from '@/types/app'

// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

const { tagsViewList } = storeToRefs(appStore.useBaseStore)
const { addTagsViewList, changeTagsView } = appStore.useBaseStore

// 生成title
const getTitle = (route: RouteRecordRaw) => {
  let title: string = ''
  if (!route.meta) {
    const pathArr: string = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }
  return title
}

const route = useRoute()
watch(
  route,
  (to: RouteRecordRaw, from: RouteRecordRaw) => {
    // 并不是所有路由都需要保存
    // if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
// 没这段代码，也可以tag中英文切换
wacthSwitchLang(() => {
  tagsViewList.value.forEach((item: tagsViewItemType, index: number) => {
    changeTagsView({
      index,
      tag: {
        ...item,
        title: getTitle(item)
      }
    })
  })
})
</script>

<style scoped></style>
