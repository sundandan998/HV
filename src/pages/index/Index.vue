<template>
    <div class="index">
      <!-- <div class="index-header">
        头部header
        <mt-header title>
          <router-link to="/" slot="left">
            <mt-button icon="back" v-on:click="$router.go(-1)">hv</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
      </div> -->
      <div class="index-body">
        <mt-cell title="服务名称">
          <span class="price">价格</span>
        </mt-cell>
        <div v-for="(item, index) in dataList" :key="index">
          <mt-cell :title="item.title">
            <span class="integral">{{ item.integral }}</span>
            <mt-button size="small" @click.native="judge(item.id)">预约</mt-button>
          </mt-cell>
        </div>
      </div>
      <!-- 底部tabber -->
      <div>
        <tabber :message="selected" @showLogin="showLoginModal"></tabber>
      </div>
      <!-- 弹框 -->
      <login :showLogin=showModalLogin @isShowLogin="showLoginModal"></login>
    </div>
  </template>
  <script>
    import Tabber from '../../assets/tabber/Tabber.vue'
    import Login from '@/components/login.vue'
    // 接口请求
    import api from '@/api/user/User.js'
    export default {
      data() {
        return {
          selected: 'index',
          message: 'index',
          readonly: true,
          showModalLogin: false,
          show: false,
          submitBtnDisabled: true,
          dataList: [],
          // 首页列表
          list: {
            page: 1,
            page_size: 6
          },
          // openId参数
          code: {
            code: ''
          }
        }
      },
      created() {
        document.title = 'hv'
        this.serverList()
        this.openId()
      },
      mounted(){
        this.openId
      },
      components: {
        Tabber,
        Login
      },
      methods: {
        judge(id) {
          // debugger
          if (this.$store.getters.token !== '') {
            this.showModalLogin = false
            // console.log( this.showModalLogin)
            this.$router.push({
              name: 'Reservation',
              params: { list: this.dataList, id: id }
            })
            this.$store.commit('detail', this.dataList)
          } else {
            this.showModalLogin = true
            // console.log( this.showModalLogin)
          }
        },
        showLoginModal() {
          this.showModalLogin = !this.showModalLogin
        },
        openId() {
          var url = window.location.href
          var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
          // debugger
          var r = window.location.href.split('?')
          if (r.length === 1) {
            return null
          }
          r = r[1]
          r = r.match(reg)
          if (r == null) {
            return null
          }
          var code = unescape(r[2])
          if(code!=''&& this.$store.getters.token  == ''){
          api.openId({ code: code }).then(res => {
            if (res.code == 0) {
              this.showModalLogin = false
              this.$store.dispatch('setUserInfo',{data:res.info})
              this.$store.dispatch('setToken',res.token)
              this.$router.push({
              name: 'Reservation',
              params: { list: this.dataList, id: id }
            })  
          }
          }).catch(err => {
            console.log(err)
            // debugger
            if (err.code == 4003) {
            // console.log(err.access_token)
               window.sessionStorage.setItem("access_token", err.access_token)
               this.showLoginModal() 
            }
          })
        }     
        },
        // 首页列表
        serverList() {
          api
            .serviceList(this.list)
            .then(res => {
              this.dataList = res.data
              this.$store.commit('detail', res.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
  
    }
  </script>
  <style lang="scss">
    @import "../../assets/scss/Global.scss";
  </style>
