const app = {
  state: {
//	详情
    detail:{},
//  地址薄添加
    refpath:'',
//  版本
		version:''
  },
  mutations: {
    detail:(state,data) => {
    	state.detail = data
    },
    refpath:(state,data) => {
    	state.refpath = data
    },
    version:(state,data) => {
    	state.version = data
    }
  },
  actions: {
     	detail: ({ commit },detail) => {
    		commit('detail',detail)
    },
    	refpath: ({ commit },detail) => {
    		commit('refpath',detail)
    },
     	version: ({ commit },detail) => {
    		commit('version',detail)
    }
  }
}
export default app