import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cs',
      name: 'cs',
      component: () => import('@/pages/index/cs')
    },
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
      component: () => import('@/pages/mine/Mine')
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
      name: 'Myappointment',
      component: () => import('@/pages/mine/my-reservation/MyAppointment')
    },
    // 预约详情
    {
      path: '/detail/:id',
      name: 'MyAppointmentDetail',
      component: () => import('@/pages/mine/my-reservation/MyAppointmentDetail')
    },
    // 预约信息
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('@/pages/index/Reservation')
    },
    // 明细
    {
      path: '/details',
      name: 'Details',
      component: () => import('@/pages/mine/transfer-details/TransferDetails')
    },
    // 明细详情
    {
      path: '/flow/:id',
      name: 'Flow',
      component: () => import('@/pages/mine/transfer-details/TransferFlow')
    }
  ]
})
