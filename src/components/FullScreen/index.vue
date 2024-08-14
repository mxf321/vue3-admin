<template>
  <div @click="onToggle" id="guide-full">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { type Ref, onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen: Ref<boolean> = ref(false)
// 触发事件
const onToggle: () => void = () => {
  screenfull.toggle()
}
// 监听 screenfull 的变化
const change: () => void = () => {
  isFullscreen.value = !isFullscreen.value
}

// on:绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// off:取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
