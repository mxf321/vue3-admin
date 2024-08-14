<template>
  <el-breadcrumb separator="/" id="guide-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span v-if="index === breadcrumbData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

import type { RouteRecordRaw } from 'vue-router'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

const { cssVar } = storeToRefs(appStore.useThemeStore)

// 生成数组数据
const breadcrumbData: Ref<RouteRecordRaw[]> = ref([])

const getBreadcrumbData = () => {
  // 当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter(
    (item: RouteRecordRaw) => item.meta && item.meta.title
  )
}
// 监听路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 主题需要切换时，hover的颜色需动态
const linkHoverColor: Ref<string> = ref(cssVar.value.menuActiveText)

// 点击跳转事件
const router = useRouter()
const onLinkClick = (item: RouteRecordRaw) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
$base-color-default: #409eff;
.redirect {
  cursor: pointer;
  font-weight: 600;
  color: black;
}
.redirect:hover {
  color: v-bind(linkHoverColor);
}
</style>
