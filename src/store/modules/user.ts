import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { loginApi, getUserInfoApi } from '@/api'
import { setTimeStamp } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import type { UserInfoResult, LoginResult, LoginFormParams } from '@/types/api'
import type { AxiosResponse } from 'axios'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户 token
    const tokenStartData: string = getItem(TOKEN) || ''
    const token: Ref<string> = ref<string>(tokenStartData)
    // 用户 信息
    const userInfo = ref<UserInfoResult>()
    const setToken: (t: string) => void = (t: string) => {
      token.value = t
      setItem(TOKEN, t)
    }
    const setUserInfo = (u: UserInfoResult | undefined) => {
      userInfo.value = u
    }
    // true 表示用户信息已存在
    const hasUserInfo: ComputedRef<boolean> = computed(() => {
      return JSON.stringify(userInfo.value) !== '{}'
    })

    // 登录
    const login: (loginData: LoginFormParams) => Promise<void> = async (
      loginData: LoginFormParams
    ) => {
      const re: AxiosResponse<LoginResult> = await loginApi(loginData)
      const { accessToken }: LoginResult = re.data
      if (accessToken) {
        setToken(accessToken)
        // 跳转
        router.push('/')
        // 保存登录时间
        setTimeStamp()
      } else {
        ElMessage.error('登录失败')
      }
    }

    // 获取用户信息
    const getUserInfo: () => Promise<UserInfoResult> = async () => {
      const re: AxiosResponse<UserInfoResult> = await getUserInfoApi()
      const res: UserInfoResult = re.data
      setUserInfo(res)
      return res
    }
    // 退出登录
    const logout: () => void = () => {
      resetRouter()
      setToken('')
      setUserInfo(undefined)
      removeAllItem()
      // :清理掉权限相关配置
      router.push('/login')
    }

    return {
      token,
      userInfo,
      setToken,
      setUserInfo,
      hasUserInfo,
      login,
      getUserInfo,
      logout
    }
  },
  {
    persist: {
      key: 'user', // Key 用于引用 storage 中的数据
      storage: localStorage // 将数据持久化到的 storage 中
    }
  }
)
// 热更新 编辑你的 store，并直接在你的应用中与它们互动，
// 而不需要重新加载页面，允许你保持当前的 state、并添加甚至删除 state、action 和 getter。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
