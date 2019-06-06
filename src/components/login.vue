<template>
    <div class="modal">
      <mt-popup v-model="showLogin" :closeOnClickModal="false">
        <div class="position_re">
          <mt-header class="errHeader" v-if="showHeader" fixed :title="errTitle"></mt-header>
          <span>HV认证</span>
          <img class="closeBtn" @click.self="isShowModalHide" src="@/assets/images/cancel.svg" alt>
          <mt-field
            label="手机号："
            type="number"
            v-model="verification.mobile"
            :state="CodeStatus"
            placeholder="请输入手机号"
            @blur.native.capture="sendCode"
            :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"
          ></mt-field>
          <mt-field label="用户名：" placeholder="请输入用户名" :state="NameStatus" @blur.native.capture="userName" v-model="verification.name"></mt-field>
          <mt-field
            label="身份证号码："
            v-model="verification.id_card"
            :state="idStatus"
            :attr="{ maxlength: 18 }"
            @blur.native.capture="idCard"
            placeholder="请输入身份证号码"
          ></mt-field>
          <span class="prompt">
            <p>小提示</p>
            <p>认证信息和线下签约信息保持一致</p>
          </span>
          <!-- id="disbtn" -->
          <mt-button size="large" :disabled="submitBtnDisabled" @click="handleLogin">认证</mt-button>
        </div>
      </mt-popup>
    </div>
  </template>
<script>
import { Toast } from 'mint-ui'
import { setTimeout } from 'timers'
export default {
  name: 'login',
  props: {
    showLogin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      verification: {
        mobile: '',
        name: '',
        id_card: '',
        access_token: null
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
    // 手机号校验
    sendCode () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(this.verification.mobile)) {
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
    userName () {
      var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/
      if (!reg.test(this.verification.name)) {
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
    idCard () {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(this.verification.id_card)) {
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
    handleLogin () {
      this.verification.access_token = sessionStorage.getItem('access_token')
      // console.log(this.verification)
      this.$store
        .dispatch('loginByCode', this.verification)
        .then(res => {
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
    isShowModalHide () {
      this.$emit('isShowLogin')
    }
  },
  watch: {
    verification: {
      immediate: true,
      deep: true,
      handler (val) {
        if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(val.mobile) && /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/.test(val.name) && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val.id_card)) {
          this.submitBtnDisabled = false
        } else {
          this.submitBtnDisabled = true
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
  .modal .closeBtn{
      position: absolute;
      top: 0px;
      right: 10px;
  }
  .modal span {
      text-align: center;
      display: block;
      margin: 20px 0 18px 0;
  }
  .prompt{
    width: 90%;
    background-color: #F7F7F9;
    font-size: 12px;
    color:#B2BBC5;
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
.prompt span:first-child{
  padding-top: 10px;
}

  </style>
