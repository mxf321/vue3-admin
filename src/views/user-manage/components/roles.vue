<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    width="500"
    @close="closed"
  >
    <el-checkbox-group v-model="userRolesTitleList">
      <el-checkbox
        v-for="item in rolesList"
        :key="item.id"
        :label="item.title"
      />
    </el-checkbox-group>
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
import { type Ref, ref, defineProps, defineEmits, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { wacthSwitchLang } from '@/utils/i18n'
import { getRolesListApi, getUserRolesApi, changeUserRolesApi } from '@/api'
import type { GetRolesItemResult } from '@/types/api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const loading: Ref<boolean> = ref(false)
const onConfirm = async () => {
  loading.value = true
  const data = userRolesTitleList.value
  await changeUserRolesApi(data)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 通知父组件角色更新成功
  emits('updateRole')
  closed()
}

// 获取用户权限 GeRolesListResult
const rolesList: Ref<GetRolesItemResult[]> = ref([])
const getRolesList: () => Promise<void> = async () => {
  rolesList.value = (await getRolesListApi(props.userId)).data
}
getRolesList()

wacthSwitchLang(getRolesList)

// 当前用户角色
const userRolesTitleList: Ref<GetRolesItemResult[]> = ref([])
const getUserRoles: () => Promise<void> = async () => {
  const res = (await getUserRolesApi(props.userId)).data
  userRolesTitleList.value = res.map((item: GetRolesItemResult) => item.title)
}
getUserRoles()

// 当前用户角色
watch(
  () => props.userId,
  (val: string) => {
    if (val) getUserRoles()
  }
)
</script>
<style></style>
