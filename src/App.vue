<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { writeNewStyle, generateNewStyle } from '@/utils/theme'
import { wacthSwitchLang } from '@/utils/i18n'
import { appStore } from '@/store'

const { mainColor } = storeToRefs(appStore.useThemeStore)
const { token } = storeToRefs(appStore.useUserStore)
const { getUserInfo } = appStore.useUserStore

generateNewStyle(mainColor.value).then((newStyle: string) => {
  writeNewStyle(newStyle)
})

wacthSwitchLang(() => {
  if (token.value) {
    getUserInfo()
  }
})
</script>
<style scoped></style>
