<template>
  <div class="home">
    <!-- 中间部分 -->
    <div class="home-body">
      <div class="health-score-bot">
        <!-- <mt-cell title="HV(健康积分)" :value="'可用:'+integral.available"></mt-cell>
        <mt-cell :title="integral.total" :value="'冻结:'+integral.freeze"></mt-cell>
        <div class="health-score-btn">
          <mt-button size="small">转入</mt-button>
          <router-link to="out">
            <mt-button size="small" class="fr turn-out">转出</mt-button>
          </router-link>
        </div> -->
        <div class="health-score-details">
          <router-link to="/details">
            <b class="fr mine-detail">积分明细</b>
          </router-link>
        </div>
        <span>可用HV(健康积分)</span>
        <p>{{parseInt(integral.available)}}</p>
        <div class="health-score-btn">
          <router-link to="out">
            <mt-button size="small" class="turn-out">转出</mt-button>
          </router-link>
        </div>
      </div>
      <div class="health-information">
        <mt-cell title="个人信息" to="information" is-link>
          <img slot="icon" src="../../assets/images/information.svg">
        </mt-cell>
        <mt-cell title="我的预约" to="myAppointment" is-link>
          <img slot="icon" src="../../assets/images/reservation.svg">
        </mt-cell>
      </div>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
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
        selected: 'mine',
        message: 'mine',
        show: true,
        integral: ''
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      document.title = '我的'
      this.userIntegral()
    },
    methods: {
      // 隐藏与显示
      //   block(){
      //    if(this.show==true){
      //     this.show=false
      //   }else{
      //     this.show=true
      //   }
      // }
      // 用户积分
      userIntegral() {
        api.userIntegral().then(res => {
          this.integral = res.data
          this.$store.commit('detail', res.data)
          // console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss'
</style>