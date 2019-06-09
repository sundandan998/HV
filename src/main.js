// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
// import axios from 'axios'
import store from './store'
import 'mint-ui/lib/style.css'
// loading加载
import {Indicator} from 'mint-ui'
//vant框架样式
import 'vant/lib/index.css'
// 各种组件集合
import external from './external-components/index'
Vue.use(MintUI)
// Vue.use(axios)
Vue.use(external)
Vue.prototype.$Indicator = Indicator
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
