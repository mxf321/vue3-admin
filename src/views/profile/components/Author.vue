<template>
  <div>
    <div>
      <pan-thumb :image="img" height="100px" width="100px">
        {{ $t('msg.profile.name') }}
      </pan-thumb>
      <div>
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
      <div>
        {{ $t('msg.profile.Introduction') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanThumb from '@/components/PanThumb/index.vue'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
import { UserInfoResult } from '@/types/api'
import type { Ref } from 'vue'

let userInfo: Ref<UserInfoResult> = storeToRefs(appStore.useUserStore)
  .userInfo as Ref<UserInfoResult>

const img = userInfo.value.avatar
</script>

<style lang="scss" scoped></style>
