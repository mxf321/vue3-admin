<template>
  <el-icon v-if="icon.includes('el-icon')">
    <component :is="icon.split('-')[2]" />
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span :class="[sidebarOpened ? 'ml8' : 'ml0']">{{
    generateTitle(title)
  }}</span>
</template>

<script setup lang="ts">
import { generateTitle } from '@/utils/i18n'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { sidebarOpened } = storeToRefs(appStore.useBaseStore)

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.ml8 {
  padding-left: 8px;
}
.ml0 {
  padding-left: 0;
}
</style>
