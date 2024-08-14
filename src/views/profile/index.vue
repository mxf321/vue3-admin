<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card
      ></el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from './components/ProjectCard.vue'
import Author from './components/Author.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import { getFeatureApi } from '@/api/user'
import { type Ref, ref } from 'vue'
import { wacthSwitchLang } from '@/utils/i18n'
import type { GetFeatureItemResult } from '@/types/api'
const activeName: Ref<string> = ref('feature')
const featureData: Ref<GetFeatureItemResult[]> = ref([])
const getFeatureData = async () => {
  featureData.value = (await getFeatureApi()).data
}
getFeatureData()
wacthSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped></style>
