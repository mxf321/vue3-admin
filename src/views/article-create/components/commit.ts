import { createArticleApi, editArticleApi } from '@/api'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { EditArticleParams, CommitArticleParams } from '@/types/api'

const t = i18n.global.t

export const commitArticle = async (data: CommitArticleParams) => {
  const res = await createArticleApi(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

export const editArticle = async (data: EditArticleParams) => {
  const res = await editArticleApi(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
