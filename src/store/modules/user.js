import api from '@/api/user/User.js'
// let webTokenExpiredTime = 60 * 60 * 1000 // 前端控制，如果两个小时没有操作，退出登录。
const user = {
  state: {
    userInfo: {},
    token: '',
    roleRouter: []
    // tokenExpiredTime: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      window.sessionStorage.setItem('token', token)
    },
    // SET_ACCESSTOKEN: (state, token) => {
    //   state.token = token
    //   window.sessionStorage.setItem('token', token)
    // },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    SET_ROLEROUTER: (state, roleRouter) => {
      state.roleRouter = roleRouter
      window.sessionStorage.setItem('roleRouter', JSON.stringify(roleRouter))
    }
    // SET_TOKENEXPIREDTIME: (state, tokenExpiredTime) => {
    //   state.tokenExpiredTime = tokenExpiredTime
    //   window.sessionStorage.setItem('tokenExpiredTime', tokenExpiredTime)
    // }
  },
  actions: {
    setToken ({ dispatch, commit }, token) {
      commit('SET_TOKEN', token)
    },
    setUserInfo ({ dispatch, commit }, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    setRoleRouter ({ commit }, roleRouter) {
      commit('SET_ROLEROUTER', roleRouter)
    },
    // setTokenExpiredTime({ commit }, tokenExpiredTime) {
    //   commit('SET_TOKENEXPIREDTIME', tokenExpiredTime)
    // },
    loginByCode ({ dispatch, commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api
          .loginByCode(userInfo)
          .then(response => {
            // let nowTime = new Date().getTime()
            commit('SET_TOKEN', response.token)
            // commit('SET_TOKENEXPIREDTIME', nowTime + webTokenExpiredTime)
            dispatch('GetUserInfo', true)
              .then(res => {
                resolve(res)
              })
              .catch(err => {
                reject(err)
              })
          })
          .catch(error => {
            // console.log(error)
            reject(error)
          })
      })
    },
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api
          .information(state.token)
          .then(response => {
            commit('SET_USERINFO', response)
            commit('SET_ROLEROUTER', [])
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        commit('SET_ROLEROUTER', [])
        // commit('SET_TOKENEXPIREDTIME', 0)
        resolve()
      })
    }
    /**
     * 1.checkeTokenOver 请求钱每次触发该函数，看是否过期，如果过期，清空token，如果不过期，直接继续
     * 2.每次更新的也就是下次过期节点，不需要有其它状态。
     */
    // CheckTokenExpiredTime(store) {
    //   let nowTime = new Date().getTime()
    //   if (
    //     store.getters.tokenExpiredTime &&
    //     nowTime < store.getters.tokenExpiredTime
    //   ) {
    //     store.commit('SET_TOKENEXPIREDTIME', nowTime + webTokenExpiredTime)
    //     return true
    //   } else {
    //     store.dispatch('FedLogOut')
    //     return false
    //   }
    // }
  }
}
export default user
