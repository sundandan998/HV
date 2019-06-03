<template>
  <div class="information">
    <div class="information-body">
      <div class="information-body-top">
        <mt-cell title="姓名" :value="infor.name"></mt-cell>
        <mt-cell title="性别" :value="infor.gender">
          {{ infor.gender == 0 ? '男' : '女' }}</mt-cell>
        <mt-cell title="身份证号码" :value="infor.id_card"></mt-cell>
      </div>
      <div class="information-body-bot">
        <mt-cell title="手机号" :value="infor.mobile" is-link @click.native="modalShow"></mt-cell>
        <!-- <mt-cell title="微信号" :value="infor.wx_username" is-link @click.native="remove"></mt-cell> -->
      </div>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible" :closeOnClickModal="clickfalse">
        <span>更换手机号</span>
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <mt-field label="手机号"
        placeholder = "请输入手机号"
        type = "number"
        v-model= "phone.mobile"
        :state= "NameStatus"
        :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"
        ></mt-field>
        <mt-field label="验证码" v-model="phone.code" type = "number">
          <input type="button" v-on:click="sendSmsCode" v-model="btnContent" v-bind="{ disabled: disabled }" />
        </mt-field>
        <mt-button size="large" @click.native="success" :disabled="submitBtnDisabled">确定</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
// 接口请求
import api from '@/api/user/User.js'
export default {
  data () {
    return {
      clickfalse: false,
      popupVisible: false,
      NameStatus: '',
      time: 0,
      // phone: '',
      btnContent: '发送',
      disabled: false,
      infor: '',
      submitBtnDisabled: true,
      phone: {
        mobile: '',
        code: ''
      }
    }
  },
  created () {
    document.title = '个人信息'
    this.information()
  },
  methods: {
    // 手机号校验
    // sendcode() {
    //   var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    //   if (!reg.test(this.phone.mobile)) {
    //     this.NameStatus = 'error'
    //   } else {
    //     this.NameStatus = 'success'
    //   }
    // },
    modalShow () {
      this.popupVisible = true
      this.phone.mobile = ''
    },
    success () {
      this.popupVisible = false
      // 更换手机号
      api.replacePhone(this.phone).then(res => {
        Toast({
          message: res.msg
        })
      }).catch(err => {
        Toast({
          message: err.msg
        })
      })
    },
    modalHide () {
      this.popupVisible = false
    },
    // 解绑微信弹框
    remove () {
      this.$messagebox({
        title: '解绑微信',
        message: '账号已绑定当前微信,是否解绑',
        cancelButtonText: '否',
        confirmButtonText: '是',
        showCancelButton: true
      })
    },
    // 验证码
    // 获取验证码
    sendSmsCode () {
      // debugger
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      var phone = this.phone.mobile
      if (phone === '') {
        // console.log('123')
        // 未输入手机号
        Toast({
          message: '手机号不能为空',
          position: 'top',
          className: 'zZindex'
        })
        return
      }
      if (!reg.test(phone)) {
        // 手机号不合法
        Toast({
          message: '手机号格式错误',
          position: 'top',
          className: 'zZindex'
        })
        return
      }
      api.sendCode(this.phone).then(res => {
        if (res.code === 0) {
          this.time = 60
          this.timer()
        } else {
          Toast({
            message: res.msg
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btnContent = this.time + 's'
        this.disabled = true
        var timer = setTimeout(this.timer, 1000)
      } else if (this.time === 0) {
        this.btnContent = '获取验证码'
        clearTimeout(timer)
        this.disabled = false
      }
    },
    // 个人信息
    information () {
      api.information().then(res => {
        this.infor = res.data
        this.$store.commit('detail', res.data)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    phone: {
      immediate: true,
      deep: true,
      handler (val) {
        // debugger
        if (val.mobile === '' || val.code === '') {
          // debugger
          this.submitBtnDisabled = true
        } else {
          this.submitBtnDisabled = false
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
