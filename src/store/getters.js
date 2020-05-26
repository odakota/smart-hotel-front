const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  avatar: state => state.user.avatar,
  nickname: state => state.user.fullName,
  welcome: state => state.user.welcome,
  permissions: state => state.user.permissionList,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  allPermission: state => state.app.allPermission
}

export default getters
