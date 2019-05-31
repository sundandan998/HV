<template>
  <div class="index">
    <div class="index-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)">首页</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="index-body">
      <mt-cell title="服务名称">
        <span class="price">价格</span>
      </mt-cell>
      <div v-for="(item, index) in dataList" :key="index">
        <mt-cell :title="item.title">
          <span class="integral">{{ item.integral }}</span>
          <mt-button size="small" @click="judge(item.id)">预约</mt-button>
        </mt-cell>
      </div>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible" :closeOnClickModal="clickfalse" @click="modalHide">
        <span>HV认证</span>
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <mt-field label="手机号" type="tel" v-model="verification.mobile" :state="NameStatus" @blur.native.capture="sendCode" :attr="{ maxlength: 11 }"></mt-field>
        <mt-field label="用户名" type="tel" v-model="verification.name"></mt-field>
        <mt-field label="身份证号码" type="tel" v-model="verification.id_card" :state="idStatus" :attr="{ maxlength: 18 }" @blur.native.capture="idCard"></mt-field>
        <!-- id="disbtn" -->
        <mt-button size="large" :disabled="submitBtnDisabled" @click="handleLogin">认证</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        selected: 'index',
        message: 'index',
        readonly: true,
        clickfalse: false,
        popupVisible: false,
        show: false,
        submitBtnDisabled: true,
        dataList: [],
        idStatus: '',
        NameStatus: '',
        // 首页列表
        list: {
          page: 1,
          page_size: 6
        },
        //login 参数
        verification: {
          mobile: '15701644059',
          name: '孙丹丹',
          id_card: '111111111111111111',
          access_token: '151',
        },
        // openId参数 
        code: {
          code: ''
        }
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      // this.modalHide()
      this.serverList()
      this.openId()
      // this.getQueryString()
      // console.log(this.phone.value)
    },
    methods: {    
      judge(id) {
        // debugger
        if (this.$store.getters.token != '') {  
          // window.sessionStorage.setItem("access_token", "")                
          this.$router.push({
            name:'Reservation',
            params:{list:this.dataList,id:id}
          })          
          this.$store.commit('detail',this.dataList)  
        } else {
          this.modalShow()
        }
      },
      // 预约
      handleLogin() {
        this.$store.dispatch('loginByCode', this.verification)
          .then(res => {
            console.log(res)
            this.modalHide()
            this.$store.commit('detail', res.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      openId() {
        var url = window.location.href
        var reg = new RegExp('(^|&)' + "code" + '=([^&]*)(&|$)', 'i')
        // debugger
        var r = window.location.href.split('?')
        if (r.length == 1) {
          return null
        }
        var r = r[1]
        var r = r.match(reg)
        // console.log( window.location.href.substr(1).match(url))
        if (r == null) {
          return null
        }
        var code = unescape(r[2])
        // console.log(code)
        api.openId({ code: code }).then(res => {
          this.$store.commit('detail', res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      // 首页列表
      serverList() {
        api
          .serviceList(this.list)
          .then(res => {
            this.dataList = res.data
            // console.log(this.dataList)
            this.$store.commit('detail',res.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 手机号校验
      sendCode() {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
        if (!reg.test(this.verification.mobile)) {
          this.NameStatus = 'error'
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
      // 模态框显示
      modalShow() {
        this.popupVisible = true
      },
      // 模态框隐藏
      modalHide() {
        this.popupVisible = false
      }
    },
    watch: {
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.mobile != '' && val.name != '' && val.id_card != '') {
            this.submitBtnDisabled = false
          } else {
            this.submitBtnDisabled = true
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss'
</style>