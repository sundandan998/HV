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
      <div class="information-body-pwd">
        <mt-cell title="修改支付密码"  @click.native="modalShowPwd" is-link></mt-cell>
        <router-link to="forget">
        <mt-cell title="忘记支付密码" is-link></mt-cell>
      </router-link>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible" :closeOnClickModal="clickfalse" class="mobile-modal">
        <span>更换手机号</span>
        <img class="fr" @click="modalHide" src="../../../assets/images/cancel.svg" alt="" />
        <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="phone.mobile" :state="NameStatus" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,10)'}"></mt-field>
        <mt-field label="验证码" v-model="phone.code" placeholder="请输入验证码" :attr="{ oninput: 'if(value.length>6)value=value.slice(0,5)'}"
          type="number">
          <input class="fr" v-on:click="sendSmsCode" v-model="btnContent" />
        </mt-field>
        <mt-button size="large" @click.native="success" :disabled="submitBtnDisabled">确定</mt-button>
      </mt-popup>
    </div>
    <div class="modal">
      <mt-popup v-model="popupPwd" :closeOnClickModal="clickfalse"class="modal-pwd">
        <span>修改支付密码</span>
        <img class="fr" @click="modalHide" src="../../../assets/images/cancel.svg" alt="" />
        <p>原支付密码</p>
        <van-password-input :value="editPass.old_pay_pwd" @focus="showKeyboard = true" />
        <p>新密码</p>
        <van-password-input :value="editPass.new_pay_pwd1"  @focus="showKeyboard1 = true" />
        <p>确认密码</p>
        <van-password-input :value="editPass.new_pay_pwd2" @focus="showKeyboard2 = true" />
        <b>{{this.infor.mobile}}</b> 
        <mt-field v-model="phone.code" placeholder="请输入验证码">
          <input class="fr" v-on:click="pwdSendCode" v-model="btnContent" />
        </mt-field>
          <!-- " -->
        <mt-button size="large" @click.native="edit":disabled="submitBtnDisabled" >下一步</mt-button>           
      </mt-popup> 
      <div>
          <!-- 数字键盘 -->
          <van-number-keyboard
          class="pwd-keyword"
          :show="showKeyboard"
          @input="onInput"
          extra-key="."
          @delete="onDelete"
          delete-button-text="删除"
          @blur="showKeyboard = false"
          />
          <van-number-keyboard
          class="pwd-keyword"
          :show="showKeyboard1"
          @input="onInput1"
          extra-key="."
          @delete="onDelete1"
          delete-button-text="删除"
          @blur="showKeyboard1 = false"
          />
          <van-number-keyboard
          class="pwd-keyword"
          :show="showKeyboard2"
          @input="onInput2"
          extra-key="."
          @delete="onDelete2"
          delete-button-text="删除"
          @blur="showKeyboard2 = false"
          />
        </div>     
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
      value:'',
      clickfalse: false,
      popupVisible: false,
      popupPwd:false,
      NameStatus: '',
      time: 0,
      showKeyboard: false,
      showKeyboard1:false,
      showKeyboard2:false,
      // phone: '',
      btnContent: '发送',
      infor: '',
      submitBtnDisabled: true,
      phone: {
        mobile: '',
        code: ''
      },
      editPass:{
        code:'',
        old_pay_pwd:'',
        new_pay_pwd1:'',
        new_pay_pwd2:''
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
    // 键盘密码框
    onInput(key) {
      this.editPass.old_pay_pwd = (this.editPass.old_pay_pwd + key).slice(0, 6);
    },
    onInput1(key) {
      this.editPass.new_pay_pwd1 = (this.editPass.new_pay_pwd1 + key).slice(0, 6);
    },
    onInput2(key) {
      this.editPass.new_pay_pwd2 = (this.editPass.new_pay_pwd2 + key).slice(0, 6);
    },
    onDelete() {
      this.editPass.old_pay_pwd = this.editPass.old_pay_pwd.slice(0, this.editPass.old_pay_pwd.length - 1)
    },
    onDelete1() {
      this.editPass.new_pay_pwd2 = this.editPass.new_pay_pwd1.slice(0, this.editPass.new_pay_pwd1.length - 1)
    },
    onDelete2() {
      this.editPass.new_pay_pwd2 = this.editPass.new_pay_pwd2.slice(0, this.editPass.new_pay_pwd2.length - 1)
    },
    modalShow () {
      this.popupVisible = true
      this.phone.mobile = ''
      this.phone.code = ''
    },
    modalShowPwd(){
      this.popupPwd = true
    },
    success () {
      // debugger
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
    // 修改密码
    edit(){
      api.editPwd(this.editPass).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    modalHide () {
      this.popupVisible = false
      this.popupPwd = false
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
          Toast({
            message: res.msg,
            position: 'top',
            className: 'zZindex'
          })
        }
      }).catch(err => {
        if (err.code !== 0) {
          Toast({
            message: err.msg,
            position: 'top',
            className: 'zZindex'
          })
        }
      })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btnContent = this.time + 's'
        var timer = setTimeout(this.timer, 1000)
      } else if (this.time === 0) {
        this.btnContent = '发送'
        clearTimeout(timer)
      }
    },
    // 修改密码弹框验证码
    pwdSendCode(){
      api.sendCode(this.verification).then(res => {
        if (res.code === 0) {
          this.time = 60
          this.timer()
          Toast({
            message: res.msg,
            position: 'top',
            className: 'zZindex'
          })
        }
      }).catch(err => {
        if (err.code !== 0) {
          Toast({
            message: err.msg,
            position: 'top',
            className: 'zZindex'
          })
        }
      })
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
    },
    editPass: {
      immediate: true,
      deep: true,
      handler (val) {
        // debugger
        if (val.old_pay_pwd === ''|| val.new_pay_pwd1==='' ||val.new_pay_pwd2===''|| val.code === '') {
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
  @import '../../../assets/scss/Global.scss'
</style>
