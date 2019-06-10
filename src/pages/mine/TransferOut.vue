<template>
  <div class="transfer-out">
    <div class="transfer-out-body">
      <div class="transfer-out-body-cell">
        <mt-cell title="HV(健康积分)" :value="'可用:' + this.detail.available"></mt-cell>
        <mt-cell :title="this.detail.total" :value="'冻结:' + this.detail.freeze"></mt-cell>
      </div>
      <div class="transfer-out-body-field">
        <mt-field label="接收人" @blur.native.capture="userName" :state="NameStatus" v-model="turnIntegral.recipient" placeholder="请输入接收人"></mt-field>
        <mt-field label="手机号" type="number" placeholder="请输入手机号" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"
          v-model="turnIntegral.mobile"></mt-field>
      </div>
      <div>
        <mt-field label="积分数量" type="number" placeholder="请输入积分数量" v-model="turnIntegral.amount"></mt-field>
      </div>
    </div>
    <div class="transfer-out-button">
      <mt-button size="large" v-show="isOriginHei"  @click="success" :disabled=disabled class="sure">确认</mt-button>
      <router-link to="mine">
        <mt-button size="large"   v-show="isOriginHei" class="cancel">取消</mt-button>
      </router-link>

    </div>
    <div v-if="hide">
      <mt-popup v-model="turnModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" /> 
        <span>输入支付密码</span>      
        <p>向xx转账</p>
        <p>20000(积分)</p>
        <van-password-input :value="value" @focus="showKeyboard= true"/>
      </mt-popup>  
    </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
      :show="showKeyboard"
      extra-key="."
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
// 接口请求
import api from '@/api/user/User'
export default {
  data () {
    return {
      value:'',
      hide:false,
      showKeyboard:false,
      turnModelModel:'',
      disabled: true,
      NameStatus: '',
      isOriginHei: true,
      screenHeight: document.documentElement.clientHeight,
      originHeight: document.documentElement.clientHeight,
      turnIntegral: {
        recipient: '',
        mobile: '',
        amount: ''
      }
    }
  },
  created () {
    document.title = '转出'
  },
  mounted () {
    let self = this
    window.onresize = function () {
      return (function () {
        self.screenHeight = document.documentElement.clientHeight
      })()
    }
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    modalHide () {
      this.hide = false
    },
    success () {
      this.hide = true
      // const html = `
      // 将向${this.turnIntegral.recipient}转账${this.turnIntegral.amount}积分,成功后无法退回,<p>确定转出？</p>
      // `
      // this.$messagebox({
      //   title: '转出',
      //   message: html,
      //   cancelButtonText: '否',
      //   confirmButtonText: '是',
      //   showCancelButton: true
      // }).then(action => {
      //   if (action === 'confirm') {
      //     api.turnOut(this.turnIntegral).then(res => {
      //       Toast({
      //         message: res.msg
      //       })
      //       this.$router.push({
      //         name: 'Mine'
      //       })
      //     }).catch(err => {
      //       Toast({
      //         message: err.msg
      //       })
      //     })
      //   }
      // })
    },
    // 用户名校验
    userName () {
      var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/
      if (!reg.test(this.turnIntegral.recipient)) {
        Toast({
          message: '用户名不能输入空格'
        })
        this.showHeader = true
        setTimeout(() => {
          this.showHeader = false
        }, 3000)
      } else {
        this.NameStatus = 'success'
      }
    }
  },
  watch: {
    turnIntegral: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.recipient !== '' && val.mobile !== '' && val.amount !== '') {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    },
    screenHeight (val) {
      if (this.originHeight > val + 100) {
        this.isOriginHei = false
      } else {
        this.isOriginHei = true
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
