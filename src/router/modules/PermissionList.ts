import layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      component: () => import('@/views/permission-list/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
