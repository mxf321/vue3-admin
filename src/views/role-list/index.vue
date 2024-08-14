<template>
  <div>
    <el-card>
      <el-table :data="roleList" style="width: 100%" border>
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onDistributePermissionClick(row)"
              v-permission="['distributePermission']"
              >{{ $t('msg.role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
      @updateRole="getRoleList"
    />
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { getRoleListApi } from '@/api/role.js'
import { wacthSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

import type { GetRoleItemResult } from '@/types/api'

const roleList: Ref<GetRoleItemResult[]> = ref([])
const getRoleList: () => Promise<void> = async () => {
  roleList.value = (await getRoleListApi()).data
}

getRoleList()
wacthSwitchLang(getRoleList)

// 分配权限
const distributePermissionVisible: Ref<boolean> = ref(false)
const selectRoleId: Ref<string> = ref('')
const onDistributePermissionClick = (row: GetRoleItemResult) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>
<style></style>
