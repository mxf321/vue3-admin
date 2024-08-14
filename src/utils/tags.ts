const whiteList = ['/login', '/404', '/401']

export const isTags: (path: string) => boolean = (path: string) => {
  return !whiteList.includes(path)
}
