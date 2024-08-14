<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    width="500"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="permissionList"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading"
          >{{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, Ref } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { wacthSwitchLang } from '@/utils/i18n'
import {
  getRolePermissionApi,
  distributePermissionApi,
  getPermissionListApi
} from '@/api'
import type { GetPermissionListResult } from '@/types/api'
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type.mjs'

const loading: Ref<boolean> = ref(false)
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])

const treeRef = ref<InstanceType<typeof ElTree>>()
// 属性结构配置
const defaultProps: {
  children: string
  label: string
} = {
  children: 'children',
  label: 'permissionName'
}

// 关闭
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  loading.value = true
  const data = (
    await distributePermissionApi({
      roleId: props.roleId,
      permissions: treeRef.value!.getCheckedKeys()
    })
  ).data
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 通知父组件角色更新成功
  emits('updateRole')
  closed()
}

// 获取 用户权限
const permissionList: Ref<GetPermissionListResult[]> = ref([])
const getPermissionList: () => Promise<void> = async () => {
  permissionList.value = (await getPermissionListApi()).data
}
getPermissionList()

wacthSwitchLang(getPermissionList)

// 当前角色的权限 getRolePermissionApi
const getRolePermission: () => Promise<void> = async () => {
  const checkedKeys: TreeKey[] = (await getRolePermissionApi(props.roleId))
    .data as TreeKey[]
  if (checkedKeys && checkedKeys.length) {
    treeRef.value?.setCheckedKeys(checkedKeys)
  }
}
getRolePermission()

// 当前用户角色
watch(
  () => props.roleId,
  (val: string) => {
    if (val) getRolePermission()
  }
)
</script>
<style></style>
