import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { publicRoutes, privateRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { Ref } from 'vue'
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw

export const usePermissionStore = defineStore(
  'permission',
  () => {
    // 路由表：初始时所拥有的路由表
    const routes: Ref<RouteRecordRaw[]> = ref(publicRoutes)
    // 增加路由
    const setRoutes = (newRoutes: RouteRecordRaw[]) => {
      routes.value = [...publicRoutes, ...newRoutes]
    }

    // 根据权限数据筛选路由
    const filterRoutes: (menus: string[]) => RouteRecordRaw[] = (
      menus: string[]
    ) => {
      // 筛选之后，录取到的需要通过 addRoute 进行添加的路由表数据
      const routes: RouteRecordRaw[] = []
      menus.forEach((key: string) => {
        routes.push(
          ...privateRoutes.filter((item: RouteRecordRaw) => item.name === key)
        )
      })
      // 所有不匹配的路由，全部进入 404 的路由配置
      // 注意：该配置必须要在所有路由指定之后
      // 因为有动态路由，所以得加到动态路由之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      setRoutes(routes)
      return routes
    }

    return { routes, setRoutes, filterRoutes }
  },
  {
    persist: {
      key: 'permission', // Key 用于引用 storage 中的数据
      storage: localStorage // 将数据持久化到的 storage 中
    }
  }
)
// 热更新 编辑你的 store，并直接在你的应用中与它们互动，
// 而不需要重新加载页面，允许你保持当前的 state、并添加甚至删除 state、action 和 getter。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
