<template>
  <el-dropdown
    class="theme"
    trigger="click"
    @command="handleSetTheme"
    id="guide-theme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <select-color v-model="selectColorVisible" />
</template>

<script setup lang="ts">
import SelectColor from './components/SelectColor.vue'
import { type Ref, ref } from 'vue'
const selectColorVisible: Ref<boolean> = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
