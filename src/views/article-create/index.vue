<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        v-model="title"
        :placeholder="$t('msg.article.titlePlaceholder')"
        maxlength="20"
        clearable
      ></el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown"
          ><markdown
            :title="title"
            :articleDetail="articleDetail"
            @onSuccess="onSuccess"
          />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor
            :title="title"
            :articleDetail="articleDetail"
            @onSuccess="onSuccess"
        /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { getArticleDetailApi } from '@/api'
import { useRoute } from 'vue-router'
import { GetArticleDetailResult } from '@/types/api'

const title: Ref<string> = ref('')
const activeName: Ref<string> = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑状态
const route = useRoute()
const articleId: number | string = route.params.id
let articleDetail: Ref<GetArticleDetailResult | undefined> = ref<
  GetArticleDetailResult | undefined
>()
const getArticleDetail: () => void = async () => {
  const res: GetArticleDetailResult = (await getArticleDetailApi(articleId))
    .data
  articleDetail.value = res
  title.value = articleDetail.value.title
}

if (articleId) getArticleDetail()
const handleClick = () => {}

watch(
  () => articleId,
  (val: string | number) => {
    if (val) getArticleDetail()
  }
)
</script>
<style scoped></style>
