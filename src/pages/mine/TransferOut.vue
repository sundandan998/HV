<template>
  <div class="transfer-out">
    <div class="transfer-out-body">
      <div class="transfer-out-body-cell">
        <mt-cell title="HV(健康积分)" :value="'可用:' + this.detail.available"></mt-cell>
        <mt-cell :title="this.detail.total" :value="'冻结:' + this.detail.freeze"></mt-cell>
      </div>
      <div class="transfer-out-body-field">
        <mt-field label="接收人" v-model="turnIntegral.recipient"></mt-field>
        <mt-field label="手机号" type="tel" v-model="turnIntegral.mobile"></mt-field>
      </div>
      <div>
        <mt-field label="积分数量" type="tel" v-model="turnIntegral.amount"></mt-field>
      </div>
    </div>
    <div class="transfer-out-button">
      <mt-button size="large" @click="success">确认</mt-button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { mapGetters } from 'vuex'
  // 接口请求
  import api from '@/api/user/User'
  export default {
    data() {
      return {
        turnIntegral: {
          recipient: '',
          mobile: '',
          amount: ''
        }
      }
    },
    created() {
      document.title = '转出'
    },
    methods: {
      success() {
        //debugger
        // console.log(msg)
        api
          .turnOut(this.turnIntegral)
          .then(res => {
            Toast({
              message: res.msg
            })
          })
          .catch(err => {
            Toast({
              message: err.msg
            })
          })
      }
    },
    computed: {
      ...mapGetters(['detail'])
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';
</style>