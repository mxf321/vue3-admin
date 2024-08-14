import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
  InternalAxiosRequestConfig,
  AxiosInstance,
  RawAxiosRequestHeaders,
  AxiosRequestTransformer
} from 'axios'
import { isCheckTimeout } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { appStore } from '@/store'
import { useRouter } from 'vue-router'
import { ApiResult } from '@/types/api'

export interface RequestConfigExtra {
  token?: boolean
  customDev?: boolean
  loading?: boolean
}

const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  baseURL: '',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const router = useRouter()
service.interceptors.request.use(
  (config: AxiosRequestConfig & RequestConfigExtra): any => {
    // // 处理请求前的url
    // if (
    //   import.meta.env.DEV &&
    //   import.meta.env.VITE_APP_BASE_API_DEV &&
    //   import.meta.env.VITE_APP_BASE_URL_DEV &&
    //   config.customDev
    // ) {
    //   //  替换url的请求前缀baseUrl
    //   config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV
    // }
    const { token } = storeToRefs(appStore.useUserStore)
    const { logout } = appStore.useUserStore
    // const { language } = storeToRefs(appStore.useBaseStore)

    if (token && token.value) {
      // 超时退出登录
      if (isCheckTimeout()) {
        logout()
        return Promise.reject(new Error('token 失效'))
      }
      // 在headers后加一个! 表示是一定存在的
      config.headers!['Authorization'] = `Bearer ${token.value}`
    }
    // // 配置接口国际化
    // config.headers!['Accept-Language'] = language.value

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<ApiResult>): any => {
    const res: ApiResult = response.data
    if (res.code !== 200) {
      ElMessage.error(res.msg)
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status, statusText } =
        error.response as AxiosResponse<ApiResult>
      if (status === 401) {
        ElMessage.error({
          message: `401: ${data?.msg || statusText}`
        })
        /**
         * 这里处理清空用户信息和token的逻辑，后续扩展
         */
        router
          .push({
            path: '/login',
            query: {
              redirect: router.currentRoute.value.fullPath
            }
          })
          .then(() => {})
      } else if (status === 403) {
        ElMessage.error({
          message: `403: ${data?.msg || statusText}`
        })
      } else if (status === 500) {
        ElMessage.error({
          message: `500: ${data?.msg || statusText}`
        })
      } else {
        ElMessage.error({
          message: `服务错误: ${data?.msg || statusText}`
        })
      }
    }

    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>
export const request = async <T>(
  url: string,
  method: RequestMethods,
  data?: object
) => {
  // 参数：地址，请求方式，提交的数据
  // 返回：promise
  return service.request<any, ApiResult<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data
  })
}

export default service
