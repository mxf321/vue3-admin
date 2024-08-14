<template>
  <el-menu
    :collapse="!sidebarOpened"
    :active-text-color="cssVar.menuActiveText"
    :background-color="mainColor"
    :default-active="activeMenu"
    :text-color="cssVar.menuText"
    unique-opened
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

const { sidebarOpened } = storeToRefs(appStore.useBaseStore)
const { cssVar, mainColor } = storeToRefs(appStore.useThemeStore)

const router = useRouter()
const routes: ComputedRef<RouteRecordRaw[]> = computed(() => {
  const fRoutes: RouteRecordRaw[] = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

// 默认激活
const route = useRoute()
const activeMenu: ComputedRef<string> = computed(() => {
  const { path } = route
  return path
})
</script>

<style scoped></style>
