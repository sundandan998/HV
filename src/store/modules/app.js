const app = {
  state: {
    // 详情
    detail: {},
    // 地址薄添加
    refpath: ''

  },
  mutations: {
    detail: (state, data) => {
      state.detail = data
    },
    refpath: (state, data) => {
      state.refpath = data
    }
  },
  actions: {
    detail: ({ commit }, detail) => {
      commit('detail', detail)
    },
    refpath: ({ commit }, detail) => {
      commit('refpath', detail)
    }
  }
}
export default app
