<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="buttom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import E from 'wangeditor'
import { onMounted, watch } from 'vue'
import { wacthSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'
import i18next from 'i18next'

import { storeToRefs } from 'pinia'
import { appStore } from '@/store'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { language } = storeToRefs(appStore.useBaseStore)
const i18n = useI18n()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  articleDetail: {
    type: Object,
    required: false
  }
})

const emits = defineEmits(['onSuccess'])

let editor
let el
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化
  editor.config.languages = language.value === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})
// 切换语言
wacthSwitchLang(() => {
  if (!el) return
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})
// 提交
const onSubmitClick: () => Promise<void> = async () => {
  // 文章标题不为空
  if (!props.title.trim()) {
    ElMessage.error(`${i18n.t('msg.article.titlePlaceholder')}`)
    return
  }
  if (!props.title.trim()) return
  if (props.articleDetail && props.articleDetail.id) {
    await editArticle({
      id: props.articleDetail.id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
}

// 检测是否 有 articleDetail
watch(
  () => props.articleDetail,
  (val: Record<string, any> | undefined) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.editor-container {
  .buttom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
