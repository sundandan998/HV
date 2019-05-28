<template>
  <div class="transfer-out">
    <div class="transfer-out-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)">转出</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="transfer-out-body">
      <div class="transfer-out-body-cell">
        <mt-cell title="HV(健康积分)" value="可用:10,000"></mt-cell>
        <mt-cell title="20,000" value="冻结:10,000"></mt-cell>
      </div>
      <div class="transfer-out-body-field">
        <mt-field label="接收人"></mt-field>
        <mt-field label="手机号"></mt-field>
        <mt-field label="积分数量"></mt-field>
      </div>
    </div>
    <div class="transfer-out-button">
      <mt-button size="large" @click="success">确认</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
// 接口请求
import api from '@/api/user/User'
export default {
  data() {
    return {}
  },
  methods: {
    success() {
      api
        .turnOut()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      Toast({
        message: '转出成功'
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
