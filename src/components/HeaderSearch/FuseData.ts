import path from 'path-browserify'
import i18n from '@/i18n'
import type { RouteRecordRaw, Router } from 'vue-router'
type PropsType = {
  path: string
  title: string[]
}
// 解决bug:不能将命名空间“RouteRecordRaw”用作类型
type RouteRecordRaw = typeof RouteRecordRaw
// 筛选出可供搜索的路由对象
export const generateRoutes = (
  routes: RouteRecordRaw[],
  basePath: string = '/',
  prefixTitle: string[] = []
) => {
  // 创建 result 数据
  let res: PropsType[] = []
  for (const route of routes) {
    // 创建包含 path 和 title 的item
    const data: PropsType = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在meta时，使用i18n进行国际化解析，组合成新的title
    // 动态路由不允许被检索
    // 正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    // 存在children时，迭代进行处理
    if (route.children) {
      const tempRoutes: PropsType[] = generateRoutes(
        route.children,
        data.path,
        data.title
      )
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
