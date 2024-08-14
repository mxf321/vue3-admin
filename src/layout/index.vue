<template>
  <div
    class="app-wrapper"
    :class="sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: mainColor }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/TagsView/index.vue'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { sidebarOpened } = storeToRefs(appStore.useBaseStore)
const { mainColor } = storeToRefs(appStore.useThemeStore)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.app-wrapper {
  display: flex;
}
.sidebar-container {
  width: $base-left-menu-width;
  height: 100vh;
}
.main-container {
  flex: 1;
}
.fixed-header {
  flex: 1;
  height: 80px;
  border-bottom: 1px solid #eee;
}
.hideSidebar .sidebar-container {
  width: $hideSideBarWidth;
}
</style>
