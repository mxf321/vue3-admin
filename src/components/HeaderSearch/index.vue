<template>
  <div class="header-search" :class="{ show: isShow }" id="guide-search">
    <span @click="onShowClick">
      <svg-icon class-name="search-icon" icon="search"></svg-icon>
    </span>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="select"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js' // 模糊搜索
import { wacthSwitchLang } from '@/utils/i18n'
import type { RouteRecordRaw } from 'vue-router'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

// 数据源
const router = useRouter()
let searchPoll: ComputedRef<RouteRecordRaw[]> = computed(() => {
  const fRoutes: RouteRecordRaw[] = filterRoutes(router.getRoutes())
  return generateRoutes(fRoutes)
})
// 搜索库相关
let fuse: Fuse<any>
const initFuse = (searchPoll: ComputedRef<RouteRecordRaw[]>) => {
  fuse = new Fuse(searchPoll.value, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPoll)

// 控制 search 展示
const isShow: Ref<boolean> = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

// search 相关
const search = ref('')
// 搜索方法
const searchOptions: Ref<RouteRecordRaw[]> = ref([])
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onSelectChange = (val: RouteRecordRaw) => {
  router.push(val.path)
}

wacthSwitchLang(() => {
  searchPoll = computed(() => {
    const fRoutes: RouteRecordRaw[] = filterRoutes(router.getRoutes())
    return generateRoutes(fRoutes)
  })
  initFuse(searchPoll)
})
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;
  font-size: 1em !important;
  .search-icon {
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input_inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
