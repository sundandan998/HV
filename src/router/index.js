import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index/Index')
    },
    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/pages/mine/MIne')
    },
    // 预约信息
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('@/pages/index/Reservation')
    }
  ]
})
