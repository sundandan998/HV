<template>
  <div class="index">
      <div class="index-header">
        <mt-cell title="服务名称" fixed class="index-cell">
          <span class="price">价格</span>
        </mt-cell>
      </div>
    <div class="index-body">
      <div v-for="(item, index) in dataList" :key="index" class="index-title">
        <mt-cell :title="item.title" @click.native="judge(item.id)">
          <span class="integral">{{parseInt(item.integral)}}</span>
          <mt-button size="small" @click.native="judge(item.id)" class="index-judge">预约</mt-button>
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
// import $ from 'jquery'
export default {
  data () {
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
        page_size: 100
      },
      // openId参数
      code: {
        code: ''
      }
    }
  },
  created () {
    document.title = 'hv'
    this.serverList()
    this.openId()
  },
  components: {
    Tabber,
    Login
  },
  methods: {
    judge (id) {
      if (this.$store.getters.token !== '') {
        this.showModalLogin = false
        this.$router.push({
          name: 'Reservation',
          params: { list: this.dataList, id: id }
        })
        this.$store.commit('detail', this.dataList)
      } else {
        this.showModalLogin = true
      }
    },
    showLoginModal () {
      this.showModalLogin = !this.showModalLogin
    },
    openId () {
      // var url = window.location.href
      var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
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
      if (code !== '' && this.$store.getters.token === '') {
        api.openId({ code: code }).then(res => {
          if (res.code === 0) {
            this.showModalLogin = false
            this.$store.dispatch('setUserInfo', { data: res.info })
            this.$store.dispatch('setToken', res.token)
          }
        }).catch(err => {
          console.log(err)
          // debugger
          if (err.code === 4003) {
            window.sessionStorage.setItem('access_token', err.access_token)
            this.showLoginModal()
          }
        })
      }
    },
    // 首页列表
    serverList () {
      api.serviceList(this.list).then(res => {
        this.dataList = res.data
        // console.log(this.dataList[0].integral)
        parseInt(this.dataList[0].integral)
        this.$store.commit('detail', res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
</style>
