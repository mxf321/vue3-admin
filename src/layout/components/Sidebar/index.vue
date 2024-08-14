<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span class="logo-title" v-show="sidebarOpened">vue3 admin</span>
    </div>
    <el-scrollbar>
      <sidebar-menu id="guide-sidebar" />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { sidebarOpened } = storeToRefs(appStore.useBaseStore)

const logoHeight = 40
</script>

<style lang="scss" scoped>
.logo-container {
  width: inherit;
  height: v-bind(logoHeight);
  display: flex;
  padding-top: 8px;
  align-items: center;
  justify-content: space-around;
}
.logo-title {
  color: aliceblue;
  font-size: 24px;
  font-weight: strong;
}
</style>
