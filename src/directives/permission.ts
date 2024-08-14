import { appStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { DirectiveBinding } from 'vue'

const checkPermission = (el: HTMLElement, binding: DirectiveBinding) => {
  const { userInfo } = storeToRefs(appStore.useUserStore)
  // 获取对应的权限
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points: string[] | undefined =
    userInfo && userInfo.value && userInfo.value['permissions']['points']
  // value 必须是一个数组
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission =
      points &&
      points.some((point: string) => {
        return value.includes(point)
      })
    // 匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value must be an array')
  }
}

export default {
  // 在绑定元素的父组件被挂载之后调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 vnode 及其子组件的 vnode 更新后调用
  update(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}
