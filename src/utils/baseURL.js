import Vue from 'vue'
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://111.230.221.200:9090'
    break
  case 'test':
    baseUrl = 'http://111.230.221.200:9090'
    break
  case 'production':
    baseUrl = 'http://111.230.221.200:9090'
    break
}
Vue.prototype.$baseUrl = baseUrl

export default baseUrl
