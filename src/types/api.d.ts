// 定义请求响应参数，不含data
export interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
export interface ApiResult<D = any> extends Result {
  data?: D
}

export type LoginResult = {
  accessToken: string
}

export type UserInfoResult = {
  avatar: string
  permissions: {
    menus: string[]
    points: string[]
  }
  title: string
  username: string
}

export type LoginFormParams = {
  username: string
  password: string
}

export type GetArticleDetailResult = {
  id: string | number
  ranking: string | number
  title: string
  author: string
  publicDate: string | number
  desc: string
  content: string
}
export type EditArticleParams = {
  id: string | number
  title: string
  content: string
}

export type CommitArticleParams = {
  title: string
  content: string
}

export type GetArticleListParams = {
  page: string | number
  size: string | number
}

export type GetArticleItemResult = {
  id: number
  ranking: string | number
  title: string
  author: string
  publicDate: string | number
  desc: string
}

export type GetArticleListResult = {
  list: GetArticleItemResult[]
  page: string | number
  size: string | number
  total: string | number
}

export interface GetPermissionItemResult {
  id: string | number
  permissionName: string
  permissionMark: string
  permissionDesc: string
  children: []
}

export interface GetPermissionListResult extends GetPermissionItemResult {
  children?: GetPermissionItemResult[]
}

export type GetFeatureItemResult = {
  id: string | number
  title: string
  percentage: string | number
  content: string
}
export type GetFeatureResult = GetFeatureItemResult[]

export type GetChapterItemResult = {
  id: string
  title: string
  timestamp: string
  content: string
}
export type GetChapterResult = GetChapterItemResult[]

export type GetRoleItemResult = {
  id: string
  title: string
  describe: string
}
export type GetFeatureResult = GetRoleItemResult[]

export type RoleType = {
  id: string | number
  title: string
}
export type ExperienceType = {
  startTime: string | Date | number
  endTime: string | Date | number
  title: string
  description: string
}

export type GetUserDetailResult = {
  username: string
  gender: string
  nationality: string
  province: string
  openTime: string | Date | number
  remark: string[]
  address: string
  experience: ExperienceType[]
  major: string
  glory: string
  role: RoleType[]
  _id: string | number
  id: string | number
  mobile: string | number
  avatar: string
}

export type GetUserManageItemResult = {
  role: RoleType[]
  _id: string
  id: string | number
  openTime: string | Date | number
  username: string
  mobile: string | number
  avatar: string
}

export type GetUserManageListResult = {
  list: GetUserManageItemResult[]
  page: string | number
  size: string | number
  total: string | number
}

export type GetRolesItemResult = {
  id: string | number
  title: string
  describe: string
}
export type GetRolesListResult = GetRolesItemResult[]

export type UserResult = {
  username: string
  roles: string[]
  accessToken: string
  refreshToken: string
  expires: Date
}
