<template>
  <div class="modal">
    <mt-popup v-model="showLogin" :closeOnClickModal='false'>
      <span>HV认证</span>
      <img class="fr" @click="isShowModalHide" src="@/assets/images/cancel.svg" alt>
      <mt-field label="手机号" type="number" v-model="verification.mobile" :state="NameStatus" placeholder="请输入手机号" @blur.native.capture="sendCode"
        :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"></mt-field>
      <mt-field label="用户名" @blur.native.capture="userName" :state="NameStatus" v-model="verification.name" placeholder="请输入用户名"></mt-field>
      <mt-field label="身份证号码" v-model="verification.id_card" placeholder="请输入身份证号码" :state="idStatus" :attr="{ maxlength: 18 }"
        @blur.native.capture="idCard"></mt-field>
      <!-- id="disbtn" -->
      <mt-button size="large" :disabled="submitBtnDisabled" @click="handleLogin">认证</mt-button>
    </mt-popup>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
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
        verification: {
          mobile: '',
          name: '',
          id_card: '',
          access_token: null
        },
        submitBtnDisabled: true,
        NameStatus: '',
        idStatus: ''
      }
    },
    methods: {
      // 手机号校验
      sendCode() {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        if (!reg.test(this.verification.mobile)) {
          this.NameStatus = 'error'
        } else {
          this.NameStatus = 'success'
        }
      },
      // 用户名
      userName() {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,16}$/
        if (!reg.test(this.verification.name)) {
          this.NameStatus = 'error'
          this.showHeader = true
          this.errTitle = '请输入有效的用户名'
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
        if (!reg.test(this.verification.id_card)) {
          this.idStatus = 'error'
        } else {
          this.idStatus = 'success'
        }
      },
      // 登录
      handleLogin() {
        this.verification.access_token = sessionStorage.getItem('access_token')
        // console.log(this.verification)
        this.$store.dispatch('loginByCode', this.verification).then(res => {
          if (this.$store.getters.token !== '') {
            this.isShowModalHide()
            this.$store.commit('detail', res.data)
            Toast({
              message: res.msg
            })
          }
        }).catch(err => {
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
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.mobile !== '' && val.name !== '' && val.id_card !== '') {
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
</style>