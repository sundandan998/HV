/**
 * 在刷新的过程中，token和userinfo可能会被刷新掉，所以必须让其和本地缓存保持统一，目的解决刷新后的一些bug。
 */
import store from '@/store/index'
const getters = {
  showFooter: state => state.app.showFooter,
  remarks: state => state.app.remarks,
  detail: state => state.app.detail,
  refpath: state => state.app.refpath,
  version: state => state.app.version,
  token: state => {
    let stroageToken = window.sessionStorage.getItem('token')
    if ((!state.user.token || state.user.token === '') && stroageToken) {
      store.dispatch('setToken', stroageToken)
    }
    return state.user.token
  },
  userInfo: state => {
    let stroageUserInfo = JSON.parse(
      window.sessionStorage.getItem('userInfo')
    )
    if (
      (!state.user.userInfo ||
            JSON.stringify(state.user.userInfo) === '{}') &&
        stroageUserInfo
    ) {
      store.dispatch('setUserInfo', stroageUserInfo)
    }
    // console.log(state.user.userInfo)
    return state.user.userInfo
  },
  roleRouter: state => {
    let stroageRoleRouter = JSON.parse(
      window.sessionStorage.getItem('roleRouter')
    )
    if (
      state.user.roleRouter.length === 0 &&
        (stroageRoleRouter && stroageRoleRouter.length > 0)
    ) {
      store.dispatch('setRoleRouter', stroageRoleRouter)
    }
    return state.user.roleRouter
  }
// tokenExpiredTime: state => {
//     let stroageTokenExpiredTime = window.sessionStorage.getItem(
//         'tokenExpiredTime'
//     );
//     if (state.user.tokenExpiredTime === 0) {
//         store.dispatch('setTokenExpiredTime', stroageTokenExpiredTime);
//     }
//     return state.user.tokenExpiredTime;
// }
}
export default getters
