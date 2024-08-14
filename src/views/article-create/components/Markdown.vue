<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="buttom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, watch } from 'vue'
import { wacthSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

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

let mkEditor
let el
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: language.value === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
// 切换语言
wacthSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})
// 提交
const onSubmitClick: () => Promise<void> = async () => {
  // 文章标题不为空
  if (!props.title.trim()) {
    ElMessage.error(`${i18n.t('msg.article.titlePlaceholder')}`)
    return
  }
  if (props.articleDetail && props.articleDetail.id) {
    await editArticle({
      id: props.articleDetail.id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  emits('onSuccess')
}

// 检测是否 有 articleDetail
watch(
  () => props.articleDetail,
  (val: Record<string, any> | undefined) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.markdown-container {
  .buttom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
