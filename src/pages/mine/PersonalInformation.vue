<template>
  <div class="information">
    <div class="information-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >个人信息</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="information-body">
      <div class="information-body-top">
        <mt-cell title="姓名" :value="infor.name"></mt-cell>
        <mt-cell title="性别" :value="infor.gender">
          {{ infor.gender == 0 ? '男' : '女' }}</mt-cell
        >
        <mt-cell title="身份证号码" :value="infor.id_card"></mt-cell>
      </div>
      <div class="information-body-bot">
        <mt-cell
          title="手机号"
          :value="infor.mobile"
          is-link
          @click.native="modalShow"
        ></mt-cell>
        <mt-cell
          title="微信号"
          :value="infor.wx_username"
          is-link
          @click.native="remove"
        ></mt-cell>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible" :closeOnClickModal="clickfalse">
        <span>更换手机号</span>
        <img
          class="fr"
          @click="modalHide"
          src="../../assets/images/cancel.svg"
          alt=""
        />
        <mt-field
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
          v-model="phone"
          :state="NameStatus"
          @blur.native.capture="sendcode"
          :attr="{ maxlength: 11 }"
        ></mt-field>
        <mt-field label="验证码" v-model="verifyNum">
          <input
            v-on:click="sendSmsCode"
            class="verify-btn"
            type="button"
            v-model="btnContent"
            v-bind="{ disabled: disabled }"
          />
        </mt-field>
        <mt-button size="large" @click="success">确定</mt-button>
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
  data() {
    return {
      clickfalse: false,
      popupVisible: false,
      NameStatus: '',
      phone: '',
      verifyNum: '',
      btnContent: '发送',
      time: 0,
      disabled: false,
      infor: '',
      phone: {
        mobile: '18713351004',
        code: '000000'
      }
    }
  },
  created() {
    this.information()
  },
  methods: {
    // 手机号校验
    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (!reg.test(this.phone)) {
        this.NameStatus = 'error'
      } else {
        this.NameStatus = 'success'
      }
    },
    modalShow() {
      this.popupVisible = true
    },
    success() {
      this.popupVisible = false
      // 更换手机号
      api
        .replacePhone(this.phone)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      Toast({
        message: '更换成功'
      })
    },
    modalHide() {
      this.popupVisible = false
    },
    // 解绑微信弹框
    remove() {
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
    sendSmsCode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/ //手机号正则验证
      var phone = this.phone
      if (!phone) {
        //未输入手机号
        Toast('请输入手机号码')
        return
      }
      if (!reg.test(phone)) {
        //手机号不合法
        Toast('您输入的手机号码不合法，请重新输入')
      }
      this.time = 60
      this.timer()
      // 获取验证码请求
      var url = 'http://bosstan.asuscomm.com/api/common/sendSmsCode'
      this.$http
        .post(url, { username: phone }, { emulateJSON: true })
        .then(response => {
          console.log(response.body)
        })
    },
    timer() {
      if (this.time > 0) {
        this.time--
        this.btnContent = this.time + 's后重新获取'
        this.disabled = true
        var timer = setTimeout(this.timer, 1000)
      } else if (this.time == 0) {
        this.btnContent = '获取验证码'
        clearTimeout(timer)
        this.disabled = false
      }
    },
    // 验证验证码
    verificationCode() {
      var phone = this.phone //手机号
      var verifyNum = this.verifyNum //验证码
      var url = 'http://bosstan.asuscomm.com/api/common/verificationCode'
      this.$http
        .post(
          url,
          {
            username: phone,
            code: verifyNum
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          console.log(response.body)
        })
    },
    // 个人信息
    information() {
      api
        .information()
        .then(res => {
          this.infor = res.data
          this.$store.commit('detail', res.data)
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
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
