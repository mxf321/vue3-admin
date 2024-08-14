<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLable">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
          >
            {{ $t(`msg.article.${item.label}`) }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="articleList" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="`${$t(`msg.article.${item.label}`)}`"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
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
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getArticleListApi, deleteArticleApi } from '@/api'
import { ref, onActivated, onMounted, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { wacthSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { dynamicData, selectDynamicLable, tableColumns } from './dynamic/index'
import { tableRef, initSortable } from './sortable'
import { GetArticleListResult, GetArticleItemResult } from '@/types/api'

// 数据相关
const articleList: Ref<GetArticleItemResult[]> = ref([])
const total: Ref<number | string> = ref(0)
const page: Ref<number | string> = ref(1)
const size: Ref<number | string> = ref(2)
const pageValue = page.value
const sizeValue = size.value
// 获取数据的方法
const getArticleList = async ({ pageValue, sizeValue }) => {
  const res: GetArticleListResult = (
    await getArticleListApi({
      page: pageValue,
      size: sizeValue
    })
  ).data
  articleList.value = res.list
  total.value = res.total
}
getArticleList({ pageValue, sizeValue })
wacthSwitchLang(getArticleList)
// 上传后刷新数据，因为keep-alive有缓存
onActivated(getArticleList)

// 初始化 sortable
onMounted(async () => {
  await getArticleList({ pageValue, sizeValue })
  initSortable(articleList, getArticleList)
})

// size -change
const handleSizeChange = (currentSize: string | number) => {
  size.value = currentSize
  getArticleList({ pageValue, sizeValue })
}
const handleCurrentChange = (currentPage: string | number) => {
  page.value = currentPage
  getArticleList({ pageValue, sizeValue })
}

// 查看详情
const router = useRouter()
const onShowClick = (row: GetArticleItemResult) => {
  router.push({
    path: '/article/' + row.id
  })
}

// 删除用户
const i18n = useI18n()
const onRemoveClick = (row: GetArticleItemResult) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteArticleApi(row.id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      getArticleList({ pageValue, sizeValue })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style scoped>
:deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff;
  background: #304156;
}
</style>
