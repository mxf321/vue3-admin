<template>
  <el-timeline style="max-width: 600px">
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup lang="ts">
import { getChapterApi } from '@/api'
import { wacthSwitchLang } from '@/utils/i18n'
import { type Ref, ref } from 'vue'
import type { GetChapterItemResult } from '@/types/api'

const chapterData: Ref<GetChapterItemResult[]> = ref([])
const getChapterData = async () => {
  chapterData.value = (await getChapterApi()).data
}
getChapterData()
wacthSwitchLang(getChapterData)
</script>

<style lang="scss" scoped></style>
