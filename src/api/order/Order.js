import request from '../../utils/request'
export default {
  // 个人信息
  information(params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
  // 添加订单
  addOrder(params = {}) {
    return request({
      url: '/order/add/',
      method: 'post',
      data: params
    })
  },
  // 获取订单列表
  orderList(params = {}) {
    return request({
      url: '/order/list/',
      method: 'get',
      params: params
    })
  },
  // 获取订单列表详情
  orderDetail(params = {}) {
    return request({
      url: '/order/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  }
}
