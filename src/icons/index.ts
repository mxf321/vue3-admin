import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'
// 批量引入项目内的.svg文件
export const loadSvgIcon: (iconName: string) => Promise<any> = async (
  iconName: string
) => {
  const svgRequire: Record<string, any> = import.meta.glob('@/icons/svg/*.svg')
  const url = Object.keys(svgRequire).find((i: string) => i.includes(iconName))
  if (url && svgRequire[url]) return await svgRequire[url]()
}

// 全局注册 SvgIcon 组件
export default (app: App<Element>) => {
  app.component('svg-icon', SvgIcon)
}
