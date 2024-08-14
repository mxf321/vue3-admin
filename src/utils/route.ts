import path from 'path-browserify'
import type { RouteRecordRaw, Router } from 'vue-router'
import { UserInfoResult } from '@/types/api'
import { Ref } from 'vue'

// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw
type Router = typeof Router

// 所有的子集路由
const getChildrenRoutes: (routes: RouteRecordRaw[]) => RouteRecordRaw[] = (
  routes: RouteRecordRaw[]
) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 处理脱离层级的路由
export const filterRoutes = (routes: RouteRecordRaw[]) => {
  // 所有的子集路由
  const childrenRoutes: RouteRecordRaw[] = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route: RouteRecordRaw) => {
    return !childrenRoutes.find(
      (childrenRoute: RouteRecordRaw) => childrenRoute.path === route.path
    )
  })
}

export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// 根据 routes 数据，返回对应的 menu 规则数据
export const generateMenus = (routes: RouteRecordRaw[], basePath = '') => {
  const result: RouteRecordRaw[] = []
  // 不满足该条件 meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach((item: RouteRecordRaw) => {
    // 不存在 children 不存在 meta 直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children 不存在meta，迭代 generateRoutes
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children ,存在meta || 存在 children && 存在 meta
    // 因为最终的 menu 需要进行跳转，此时我们需要合并 path
    const routePath: string = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在 同名父路由 的情况
    let route = result.find((item: RouteRecordRaw) => item.path === routePath)
    // 当前 路由 尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
