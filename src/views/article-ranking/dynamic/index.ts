/**
 * 1. 动态的列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */
import { type Ref, ref, watch } from 'vue'
import DynamicData from './DynamicData'
import { wacthSwitchLang } from '@/utils/i18n.js'
export type DynamicItem = {
  label: string
  prop: string
}

// 暴露出动态的列数据
// 因为 是国际化，所以DynamicData必须是函数
export const dynamicData: Ref<DynamicItem[]> = ref(DynamicData())

// 创建 被勾选的动态列数据
export const selectDynamicLable: Ref<string[]> = ref([])
// 默认全部勾选
const initSelectDynamicLable = () => {
  selectDynamicLable.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLable()

wacthSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLable()
})

// 声明 table 的列数据
export const tableColumns: Ref<DynamicItem[]> = ref([])
watch(
  selectDynamicLable,
  (val: string[]) => {
    tableColumns.value = []
    // 遍历列数据，从中判读出当前列是否是被勾选的
    const selectData: DynamicItem[] = dynamicData.value.filter(
      (item: DynamicItem) => {
        return val.includes(item.label)
      }
    )
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
