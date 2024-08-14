<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
    id="guide-lang"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { language } = storeToRefs(appStore.useBaseStore)
const { setLanguage } = appStore.useBaseStore

// 切换语言
const i18n = useI18n()
const handleSetLanguage: (lang: 'zh-CN' | 'en') => void = (
  lang: 'zh-CN' | 'en'
) => {
  // 切换 i18n 的locale
  i18n.locale.value = lang
  // 修改vuex中保存的 language
  setLanguage(lang)
  ElMessage.success('更新成功')
}
</script>

<style lang="scss" scoped></style>
