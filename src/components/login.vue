<template>
  <!-- 注册页面 -->
  <div class="modal">
    <mt-popup v-model="showLogin" :closeOnClickModal="false">
      <div class="position_re">
        <mt-header class="errHeader" v-if="showHeader" fixed :title="errTitle"></mt-header>
        <span>HV注册</span>
        <img class="closeBtn" @click.self="isShowModalHide" src="@/assets/images/cancel.svg" alt>
        <mt-field label="手机号：" type="number" v-model="next.mobile" :state="CodeStatus" placeholder="请输入手机号" @blur.native.capture="sendCode"
          :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"></mt-field>
        <mt-field label="用户名：" placeholder="请输入用户名" :state="NameStatus" @blur.native.capture="userName" v-model="next.name"></mt-field>
        <mt-field label="身份证号码：" v-model="next.id_card" :state="idStatus" :attr="{ maxlength: 18 }" @blur.native.capture="idCard"
          placeholder="请输入身份证号码"></mt-field>
        <span class="prompt">
          <p>小提示</p>
          <p>认证信息和线下签约信息保持一致</p>
        </span>
        <!-- @click="handleLogin" -->
        <mt-button size="large" :disabled="submitBtnDisabled" @click.native="showModel">下一步</mt-button>
      </div>
    </mt-popup>
    <!-- 设置密码页面 -->
    <mt-popup v-model="pwdModel" class="pwd-modal">
      <span>HV注册</span>
      <p>设置6位数字支付密码</p>
        <van-password-input :value="verification.pay_pwd1" @focus="showKeyboard = true" />
      <p>再次输入支付密码</p>
        <van-password-input :value="verification.pay_pwd2" @focus="showKeyboard1= true" />
      <p>{{this.verification.mobile}}</p>      
      <mt-field v-model="verification.code" placeholder="请输入验证码">
        <input class="fr" v-on:click="sendSmsCode" v-model="btnContent" />
      </mt-field>
      <mt-button size="large" @click="handleLogin":disabled="submitBtnDisabled" class="pwd-model">注册</mt-button>
    </mt-popup>
    <div>
      <!-- 数字键盘 -->
      <van-number-keyboard :show="showKeyboard" extra-key="."  @input="onInput"
       @delete="onDelete" @blur="showKeyboard = false"
      />
      <van-number-keyboard :show="showKeyboard1" extra-key="." @input="onInput1"
      @delete="onDelete1" @blur="showKeyboard1 = false"
     />
     <van-number-keyboard :show="showKeyboard2" extra-key="."  @input="onInput2"
     @delete="onDelete2" @blur="showKeyboard2 = false"
    />
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { setTimeout } from 'timers'
  import { mapGetters } from 'vuex'
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    name: 'login',
    props: {
      showLogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: '',
        show: true,
        pwdModel: '',
        showKeyboard: false,
        showKeyboard1:false,
        btnContent: '发送',
        // 下一步参数
        next: {
          mobile: '',
          name: '',
          id_card: '',
          access_token: '2562565'
        },
        verification: {
          mobile: '',
          name: '',
          id_card: '',
          access_token: '2542',
          pay_pwd1: '',
          pay_pwd2: '',
          code: ''
        },
        submitBtnDisabled: true,
        NameStatus: '',
        CodeStatus: '',
        idStatus: '',
        showHeader: false,
        errTitle: ''
      }
    },
    methods: {
      onInput(key) {
        this.verification.pay_pwd1 = (this.verification.pay_pwd1 + key).slice(0, 6)
      },
      onInput1(key) {
        this.verification.pay_pwd2 = (this.verification.pay_pwd2 + key).slice(0, 6)
      }, 
      onDelete() {
        this.verification.pay_pwd1 = this.verification.pay_pwd1.slice(0, this.verification.pay_pwd1.length - 1)
      },
      onDelete1() {
        this.verification.pay_pwd2 = this.verification.pay_pwd2.slice(0, this.verification.pay_pwd2.length - 1)
      },
      sendSmsCode(){
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
      showModel() {
        // 点击下一步接口
        api.certification(this.next).then(res => {
          window.sessionStorage.setItem('next', JSON.stringify(this.next))
          if (res.code === 0) {
            this.pwdModel = true
            Toast({
              message: res.msg
            })
          } 
          var nextData =window.sessionStorage.getItem('next')
          nextData=JSON.parse(nextData)
          this.verification.mobile = nextData.mobile,
          this.verification.name = nextData.name,
          this.verification.id_card = nextData.id_card,
          this.verification.access_token = nextData.access_token
        }).catch(err => {
         if(err.code !== 0){
           console.log(err.msg)
          Toast({
            message: err.msg
            })
        }          
        })
      },
      // 手机号校验
      sendCode() {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        if (!reg.test(this.next.mobile)) {
          this.CodeStatus = 'error'
          this.showHeader = true
          this.errTitle = '请输入有效的手机号码'
          setTimeout(() => {
            this.showHeader = false
          }, 3000)
        } else {
          this.CodeStatus = 'success'
        }
      },
      // 用户名
      userName() {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/
        if (!reg.test(this.next.name)) {
          this.NameStatus = 'error'
          this.showHeader = true
          this.errTitle = '用户名不能有空格'
          setTimeout(() => {
            this.showHeader = false
          }, 3000)
        } else {
          this.NameStatus = 'success'
        }
      },
      // 身份证号验证
      idCard() {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(this.next.id_card)) {
          this.idStatus = 'error'
          this.showHeader = true
          this.errTitle = '请输入有效的身份证号'
          setTimeout(() => {
            this.showHeader = false
          }, 3000)
        } else {
          this.idStatus = 'success'
        }
      },
      // 登录
      handleLogin() {
        this.$store.dispatch('loginByCode', this.verification).then(res => {
          if (this.$store.getters.token !== '') {
            this.isShowModalHide()
            this.$store.commit('detail', res.data)
            Toast({
              message: res.msg
            })
          }
        })
          .catch(err => {
            Toast({
              message: err.msg
            })
          })
      },
      // 模态框隐藏
      isShowModalHide() {
        this.$emit('isShowLogin')
      }
    },
    watch: {
      next: {
        immediate: true,
        deep: true,
        handler(val) {
          if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(val.mobile) && /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/.test(val.name) && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val.id_card)) {
            this.submitBtnDisabled = false
          } else {
            this.submitBtnDisabled = true
          }
        }
      },
      verification: {
      immediate: true,
      deep: true,
      handler (val) {
        // debugger
        if (val.pay_pwd1 === ''|| val.pay_pwd2==='' || val.code === '') {
          // debugger
          this.submitBtnDisabled = true
        } else {
          this.submitBtnDisabled = false
        }
      }
    }
    }
  }
</script>
<style>
  .errHeader {
    background: rgb(245, 66, 54, 0.5);
    height: 25px;
  }

  .mint-header-title {
    overflow: unset;
  }

  .position_re {
    position: relative;
  }

  .modal .closeBtn {
    position: absolute;
    top: 0px;
    right: 10px;
  }

  .modal span {
    text-align: center;
    display: block;
    margin: 20px 0 18px 0;
  }

  .prompt {
    width: 90%;
    background-color: #F7F7F9;
    font-size: 12px;
    color: #B2BBC5;
    border-radius: 5px;
    padding: 3px 0 5px 5px;
  }

  span.prompt {
    margin: 0 auto;
    text-align: left;
    margin-bottom: 15px;
  }

  .prompt p {
    text-align: left;
    margin-top: 5px;
  }

  .prompt span:first-child {
    padding-top: 10px;
  }

  .pwd-modal p {
    margin: 10px 0 10px 15px;
    color: #A6A6A6;
  }

  button.mint-button.pwd-model {
    margin-top: 30px;
  }

  .van-number-keyboard.van-number-keyboard--default {
    z-index: 9999 !important;
  }

  .pwd-input {
    width: 90%;
    border-bottom: 1px solid #ccc;
    display: block;
    margin: 0 auto;
  }

  span.pwd-span.fr {
    margin-top: -30px;
    margin-right: 15px;
  }
</style>