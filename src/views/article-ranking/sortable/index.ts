import Sortable from 'sortablejs'
import { type Ref, ref } from 'vue'
import { sortArticleApi } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

// 初始化方法
export const initSortable = (tableDate: Ref<any>, cb: Function) => {
  // 1. 要拖拽的元素
  // 2. 配置对象
  // bug 用了>， 即.el-table__body-wrapper  table  tbody
  const el = tableRef.value?.$el.querySelector(
    '.el-table__body-wrapper table  tbody'
  )
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(e) {
      const { newIndex, oldIndex } = e
      await sortArticleApi({
        initRanking: tableDate.value[oldIndex].ranking,
        finalRanking: tableDate.value[newIndex].ranking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      // 重新排名成功后，获取新数据，排序
      cb && cb()
    }
  })
}
