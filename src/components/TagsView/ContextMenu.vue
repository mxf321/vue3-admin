<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
const { removeTagsView } = appStore.useBaseStore
const { tagsViewList } = storeToRefs(appStore.useBaseStore)

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const onRefreshClick: () => void = () => {
  router.go(-1)
}
const onCloseRightClick: () => void = () => {
  removeTagsView({ type: 'right', index: props.index })
}
const onCloseOtherClick: () => void = () => {
  removeTagsView({ type: 'other', index: props.index })
  nextTick(() => {
    const path = tagsViewList.value[0].path
    router.push(path)
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 1000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
