import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/pages/index/Index')
    },
    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/pages/mine/MIne')
    },
    // 转出
    {
      path: '/out',
      name: 'TransferOut',
      component: () => import('@/pages/mine/TransferOut')
    },
    // 个人信息
    {
      path: '/information',
      name: 'Information',
      component: () => import('@/pages/mine/PersonalInformation')
    },
    // 我的预约
    {
      path: '/myappointment',
      name: 'Information',
      component: () => import('@/pages/mine/MyAppointment')
    },
    // 预约信息
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('@/pages/index/Reservation')
    }
  ]
})
