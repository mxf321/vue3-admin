<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { GetFeatureItemResult } from '@/types/api'
defineProps({
  features: {
    type: Array<GetFeatureItemResult>,
    required: true
  }
})
const activeName: Ref<number> = ref(0)
</script>

<style lang="scss" scoped></style>
