import type { App } from 'vue'
import print from 'vue3-print-nb'
import permission from './permission'

export default (app: App<Element>) => {
  app.use(print)
  app.directive('permission', permission)
}
