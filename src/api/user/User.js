import request from '../../utils/request'
export default {
  // 登录接口
  loginByCode(params = {}) {
    return request({
      url: '/user/authorization/',
      method: 'post',
      data: params
    })
  },
  getUserInfo(params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
  // 转出积分
  turnOut(params = {}) {
    return request({
      url: '/user/transfer_out/',
      method: 'post',
      data: params
    })
  }
}
