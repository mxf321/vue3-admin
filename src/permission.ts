import router from '@/router'

import { storeToRefs } from 'pinia'
import { appStore } from '@/store'
import type { RouteRecordRaw } from 'vue-router'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw
// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 到哪去
 * @param {*} from 从哪来
 * @param {*} next 是否要去
 */

router.beforeEach(
  async (to: RouteConfigsTable, form: RouteConfigsTable, next) => {
    const { token, hasUserInfo } = storeToRefs(appStore.useUserStore)
    const { getUserInfo } = appStore.useUserStore
    const { filterRoutes } = appStore.usePermissionStore

    const { isLoadRouters } = storeToRefs(appStore.useLoadStore)
    const { setAsyncRoutesMark } = appStore.useLoadStore

    // 1. 用户已登录，则不允许进入 login
    // 2. 用户未登录，只允许进入 login
    if (token && token.value) {
      if (to?.path === '/login') {
        // 有 token 后，跳转login直接转到 首页
        next('/')
      } else {
        if (isLoadRouters?.value) {
          //path没匹配
          if (
            router
              .getRoutes()
              .find((item: RouteRecordRaw) => item.name === to.name)
          ) {
            next()
          } else {
            next('/404')
          }
        } else {
          const { permissions } = await getUserInfo()
          // 处理用户权限，筛选出需要添加的路由
          const fRoutes = await filterRoutes(permissions.menus)
          // 循环添加对应动态路由
          fRoutes.forEach((item: RouteRecordRaw) => {
            router.addRoute(item)
          })
          setAsyncRoutesMark(true)
          // 添加完动态路由之后，需要进行一次主动跳转9
          return next(to.path)
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  }
)
