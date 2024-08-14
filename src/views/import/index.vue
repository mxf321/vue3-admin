<template>
  <upload-excel :onSuccess="onSuccess" />
</template>
<script setup lang="ts">
import UploadExcel from '@/components/UploadExcel/index.vue'
import {
  type UserRelationsType,
  type UserRelationsKeysType,
  USER_RELATIONS,
  formatDate
} from './utils'
import { userBatchImportApi } from '@/api'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
// 导入接口未知，接口通
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImportApi(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}
// 筛选数据
const generateData = (results: UserRelationsType[]) => {
  const arr: UserRelationsKeysType[] = []
  results.forEach((item: UserRelationsType) => {
    const userInfo: UserRelationsKeysType = {} as UserRelationsKeysType
    Object.keys(item).forEach((key: string) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>
<style></style>
