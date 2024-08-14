import { createRouter, createWebHashHistory } from 'vue-router'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import PermissionList from './modules/PermissionList'
import RoleList from './modules/RoleList'
import UserManage from './modules/UserManage'

import { storeToRefs } from 'pinia'
import { appStore } from '@/store'
import type { RouteRecordRaw, Router } from 'vue-router'
import type { UserInfoResult } from '@/types/api'
import { Ref } from 'vue'

// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw
type Router = typeof Router

// 私有路由表
export const privateRoutes: RouteRecordRaw[] = [
  Article,
  ArticleCreate,
  PermissionList,
  RoleList,
  UserManage
]

// 公有路由表
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/profile',
    component: () => import('@/layout/index.vue'),
    children: [
      //个人中心 401 404
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

// 初始化路由表
export const resetRouter = () => {
  let userInfo: Ref<UserInfoResult> = storeToRefs(appStore.useUserStore)
    .userInfo as Ref<UserInfoResult>
  if (
    userInfo &&
    userInfo.value &&
    userInfo.value?.permissions &&
    userInfo.value.permissions.menus
  ) {
    const menus: string[] = userInfo.value.permissions.menus
    menus.forEach((menu: string) => {
      router.removeRoute(menu)
    })
  }
}

export default router
