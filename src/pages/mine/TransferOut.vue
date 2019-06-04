<template>
  <div class="transfer-out">
    <div class="transfer-out-body">
      <div class="transfer-out-body-cell">
        <mt-cell title="HV(健康积分)" :value="'可用:' + this.detail.available"></mt-cell>
        <mt-cell :title="this.detail.total" :value="'冻结:' + this.detail.freeze"></mt-cell>
      </div>
      <div class="transfer-out-body-field">
        <mt-field label="接收人" v-model="turnIntegral.recipient" placeholder="请输入接收人"></mt-field>
        <mt-field label="手机号" type="number" placeholder="请输入手机号" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }" v-model="turnIntegral.mobile"></mt-field>
      </div>
      <div>
        <mt-field label="积分数量" type="number" placeholder="请输入积分数量" v-model="turnIntegral.amount"></mt-field>
      </div>
    </div>
    <div class="transfer-out-button">
      <mt-button size="large" @click="success" :disabled=disabled class="sure">确认</mt-button>
      <router-link to="mine">
        <mt-button size="large" class="cancel">取消</mt-button>
      </router-link>
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
        disabled: true,
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
        // this.$Indicator.open({
        //   text: '加载中...',
        //   spinnerType: 'fading-circle'
        // })
        api.turnOut(this.turnIntegral).then(res => {
          Toast({
            message: res.msg
          })
          this.$router.push({
            name: 'Mine'
          })
          // this.$Indicator.close()
        }).catch(err => {
          Toast({
            message: err.msg
          })
          // this.$Indicator.close()
        })
      }
    },
    watch: {
      turnIntegral: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.recipient !== '' && val.mobile !== '' && val.amount !== '') {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }         
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