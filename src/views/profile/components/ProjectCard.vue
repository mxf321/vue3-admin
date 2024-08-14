<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>
    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <pan-thumb
          :image="img"
          :role="userInfo.title"
          height="100px"
          width="100px"
        >
        </pan-thumb>
      </div>
      <!-- 姓名 & 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ userInfo.title }}
        </div>
      </div>
    </div>
    <!-- 简介 -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="introduce"></svg-icon>
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
      </div>
      <!-- 功能 -->
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="reward"></svg-icon>
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="progress-item" v-for="item in features" :key="item.id">
            <div>{{ item.title }}</div>
            <el-progress status="success" :percentage="item.percentage" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import PanThumb from '@/components/PanThumb/index.vue'
import type { Ref } from 'vue'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { GetFeatureItemResult, UserInfoResult } from '@/types/api'

defineProps({
  features: {
    type: Array<GetFeatureItemResult>,
    required: true
  }
})

let userInfo: Ref<UserInfoResult> = storeToRefs(appStore.useUserStore)
  .userInfo as Ref<UserInfoResult>
const img = userInfo.value.avatar
</script>

<style lang="scss" scoped></style>
