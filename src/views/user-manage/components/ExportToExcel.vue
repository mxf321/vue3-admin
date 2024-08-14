<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.title')"
    width="30%"
    :before-close="handleClose"
    @close="closed"
  >
    <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')">
    </el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { wacthSwitchLang } from '@/utils/i18n'
import { getUserManageAllListApi } from '@/api/userManage'
import { USER_RELATIONS } from './ExportToExcelConstants'
import { dataFilter } from '@/filter'
import type { GetUserManageItemResult, RoleType } from '@/types/api'
import { UserRelationsType } from '@/views/import/utils'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
let exportDefaultName: string = i18n.t('msg.excel.defaultName')
const excelName: Ref<string> = ref('')
wacthSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

const handleClose = () => {}
// 点击确定导出
const loading: Ref<boolean> = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser: GetUserManageItemResult[] = (await getUserManageAllListApi())
    .data.list
  // 导入工具包
  const excel = await import('@/utils/Export2Excel.ts')

  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value || exportDefaultName
  })
  closed()
}

const formatJson = (
  headers: UserRelationsType,
  rows: GetUserManageItemResult[]
) => {
  return rows.map((item: GetUserManageItemResult) => {
    return Object.keys(headers).map((key: string) => {
      // 角色需要进行特殊处理
      if (headers[key] === 'role') {
        const roles: RoleType[] = item[headers[key]]
        return JSON.stringify(roles.map((role: RoleType) => role.title))
      }
      // 时间
      if (headers[key] === 'openTime') {
        return dataFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
