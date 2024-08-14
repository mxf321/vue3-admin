import { createPinia, type Pinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

import {
  useBaseStore,
  useUserStore,
  useThemeStore,
  usePermissionStore,
  useLoadStore
} from '@/store/modules'

export interface IAppStore {
  useBaseStore: ReturnType<typeof useBaseStore>
  useUserStore: ReturnType<typeof useUserStore>
  useThemeStore: ReturnType<typeof useThemeStore>
  usePermissionStore: ReturnType<typeof usePermissionStore>
  useLoadStore: ReturnType<typeof useLoadStore>
}

const appStore: IAppStore = {} as IAppStore

export const registerStore = () => {
  appStore.useBaseStore = useBaseStore()
  appStore.useUserStore = useUserStore()
  appStore.useThemeStore = useThemeStore()
  appStore.usePermissionStore = usePermissionStore()
  appStore.useLoadStore = useLoadStore()
}

export { appStore }

const pinia: Pinia = createPinia()
pinia.use(presist)

export default pinia
export * from './modules'
