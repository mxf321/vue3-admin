<template>
  <el-card>
    <el-table
      :data="permissionList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        width="180"
        prop="permissionName"
        :label="$t('msg.permission.name')"
      />
      <el-table-column
        width="180"
        prop="permissionMark"
        :label="$t('msg.permission.mark')"
      />
      <el-table-column
        prop="permissionDesc"
        :label="$t('msg.permission.desc')"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { getPermissionListApi } from '@/api'
import { type Ref, ref } from 'vue'
import { wacthSwitchLang } from '@/utils/i18n'
import type { GetPermissionListResult } from '@/types/api'

const permissionList: Ref<GetPermissionListResult[]> = ref([])
const getPermissionList: () => Promise<void> = async () => {
  permissionList.value = (await getPermissionListApi()).data
}
getPermissionList()
wacthSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
