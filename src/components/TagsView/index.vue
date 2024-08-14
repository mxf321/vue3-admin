<template>
  <div class="tags-view-container" id="guide-tag">
    <router-link
      v-for="(tag, index) in tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? mainColor : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ generateTitle(tag.title) }}
      <el-icon
        class="icon"
        :size="20"
        v-show="!isActive(tag)"
        @click.prevent.stop="onCloseClick(index)"
        ><close
      /></el-icon>
    </router-link>
    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex" />
  </div>
</template>

<script setup lang="ts">
import ContextMenu from './ContextMenu.vue'
import { type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { generateTitle } from '@/utils/i18n'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

const { tagsViewList } = storeToRefs(appStore.useBaseStore)
const { mainColor } = storeToRefs(appStore.useThemeStore)
const { removeTagsView } = appStore.useBaseStore
const route = useRoute()
// 是否被选中
const isActive = (tag: RouteRecordRaw) => {
  return tag.path === route.path
}

// 关闭tag的事件
const onCloseClick = (index: number) => {
  removeTagsView({ type: 'index', index })
}

// tag 鼠标事件
const visible: Ref<boolean> = ref(false)
const menuStyle: Ref<{
  left: string
  top: string
}> = ref({
  left: '0',
  top: '0'
})
const selectIndex: Ref<number> = ref(0)
const openMenu = (e, index: number) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (val: boolean) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped>
.tags-view-container {
  display: flex;
  margin: 3px 0 3px 3px;
}
.tags-view-item {
  display: flex;
  align-items: center;
  width: auto;
  padding: 0 5px;
  justify-content: center;
  height: 30px;
  border: 1px solid #eee;
  margin-right: 3px;
}
.tags-view-item.active {
  color: #eee;
}
.tags-view-item.active::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 3px;
}
</style>
