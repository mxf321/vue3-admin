<template>
  <div class="hamburger-container" @click="toggleClick">
    <span id="guide-hamburger">
      <svg-icon class="hamburger" :icon="icon"></svg-icon>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { sidebarOpened } = storeToRefs(appStore.useBaseStore)
const { triggerSidebarOpened } = appStore.useBaseStore

const icon: ComputedRef<string> = computed(() => {
  return sidebarOpened.value ? 'hamburger-opened' : 'hamburger-closed'
})

const toggleClick: () => void = () => {
  triggerSidebarOpened()
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  cursor: pointer;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
