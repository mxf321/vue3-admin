<template>
  <div class="article-detail-container">
    <h2 class="title">{{ articleDetail.title }}</h2>
    <div class="header">
      <span class="author"
        >{{ $t('msg.article.author') }}:{{ articleDetail.author }}</span
      >
      <span class="time"
        >{{ $t('msg.article.publicDate') }}:
        {{ $filters.relativeTime(articleDetail.publicDate) }}</span
      >
      <el-button type="text" class="edit" @click="onEditClick">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <div class="content" v-html="articleDetail.content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { wacthSwitchLang } from '@/utils/i18n'
import { getArticleDetailApi } from '@/api'
import { useRoute, useRouter } from 'vue-router'

// 获取数据的方法
const route = useRoute()
const articleId: number = route.params.id

let articleDetail = ref<any>({})
const getArticleDetail = async () => {
  articleDetail.value = (await getArticleDetailApi(articleId)).data
}

getArticleDetail()
wacthSwitchLang(getArticleDetail)

const router = useRouter()
const onEditClick: () => void = () => {
  router.push(`/article/editor/${articleId}`)
}
</script>

<style lang="scss" scoped>
.edit {
  margin-left: 10px;
}
</style>
