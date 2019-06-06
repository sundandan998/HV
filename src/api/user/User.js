import request from '../../utils/request'
export default {
  // 服务列表
  serviceList (params = {}) {
    return request({
      url: '/system/service/list/',
      method: 'get',
      params: params
    })
  },
  // 手机验证码
  sendCode (params = {}) {
    return request({
      url: '/system/sms_code/',
      method: 'post',
      data: params
    })
  },
  // 登录接口
  loginByCode (params = {}) {
    return request({
      url: '/user/authorization/',
      method: 'post',
      data: params
    })
  },
  // 获取用户openid
  openId (params = {}) {
    return request({
      url: '/user/wx/user/',
      method: 'post',
      data: params
    })
  },
  // 个人信息
  information (params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
  // 获取用户积分
  userIntegral (params = {}) {
    return request({
      url: '/user/integral/',
      method: 'get',
      params: params
    })
  },
  // 转出积分
  turnOut (params = {}) {
    return request({
      url: '/user/transfer_out/',
      method: 'post',
      data: params
    })
  },
  // 更换手机号
  replacePhone (params = {}) {
    return request({
      url: '/user/mobile/modify/',
      method: 'post',
      data: params
    })
  },
  // 明细
  details (params = {}) {
    return request({
      url: '/user/flow/list/',
      method: 'get',
      params: params
    })
  },
  // 明细详情
  detail (params = {}) {
    return request({
      url: '/user/flow/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  }
}
