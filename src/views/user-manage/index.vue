<template>
  <div class="user-manage-container">
    <el-card>
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('msg.excel.name')" prop="username" />
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile" />
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template #default="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dataFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="page"
        v-model:page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <export-to-excel v-model="exportToExcelVisible" />
    <role-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<script setup lang="ts">
import { type Ref, onActivated, ref, watch } from 'vue'
import { getUserManageListApi, deleteUserApi } from '@/api'
import { wacthSwitchLang } from '@/utils/i18n.js'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/ExportToExcel.vue'
import RoleDialog from './components/roles.vue'
import type {
  GetUserManageItemResult,
  GetUserManageListResult
} from '@/types/api'

// 数据相关
const tableData: Ref<GetUserManageItemResult[]> = ref([])
const total: Ref<number | string> = ref(0)
const page: Ref<number | string> = ref(1)
const size: Ref<number | string> = ref(2)

// 获取数据的方法
const getListData = async () => {
  const res: GetUserManageListResult = (
    await getUserManageListApi({
      page: page.value,
      size: size.value
    })
  ).data
  tableData.value = res.list
  total.value = res.total
}
getListData()
wacthSwitchLang(getListData)

// 上传后刷新数据，因为 keep-alive 有缓存
onActivated(getListData)

// size -change
const handleSizeChange = (currentSize: string | number) => {
  size.value = currentSize
  getListData()
}

const handleCurrentChange = (currentPage: string | number) => {
  page.value = currentPage
  getListData()
}

// excel 导入按钮事件
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 删除用户
const i18n = useI18n()
const onRemoveClick = (row: GetUserManageItemResult) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserApi(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      getListData()
    })
    .catch(async () => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

// 导出
const exportToExcelVisible: Ref<boolean> = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

// 查看详情
const onShowClick = (id: string | number) => {
  router.push(`/user/info/${id}`)
}

// 角色
const roleDialogVisible: Ref<boolean> = ref(false)
const selectUserId: Ref<string> = ref('')
const onShowRoleClick = (row: GetUserManageItemResult) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// 保证每次打开dialog都可以重新获取数据
watch(roleDialogVisible, (val: boolean) => {
  if (!val) selectUserId.value = ''
})
</script>

<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
