<template>
  <div class="home">
    <div class="home-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back">我的</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <!-- 中间部分 -->
    <div class="home-body">
  <!--     <div class="health-score" v-if="show">
        <span>健康积分</span>
        <p>20000</p>
        <mt-button size="normal" @click="block">领取</mt-button>
        <a href="">数量有误？不领取</a>
      </div> -->
      <div class="health-score-bot">
        <mt-cell title="HV(健康积分)" value="可用: 10,000"></mt-cell>
        <mt-cell title="20,000" value="冻结:0"></mt-cell>
        <div class="health-score-btn">
          <mt-button size="normal">转入</mt-button>
          <router-link to="out">
          <mt-button size="normal" class="fr">转出</mt-button>
          </router-link>
        </div>
      </div>
      <div class="health-information">
        <mt-cell title="个人信息" to="information"is-link>
          <img slot="icon"  src="../../assets/images/information.svg">
        </mt-cell>
        <mt-cell title="我的预约" to="myAppointment" is-link>
          <img  slot="icon"  src="../../assets/images/reservation.svg">
        </mt-cell>
      </div>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</div>
</template>
<script>
import Tabber from '../../assets/tabber/Tabber.vue'
export default {
  data() {
    return {
      selected: 'mine',
      message: 'mine',
      show:true
    }
  },
  components: {
    'app-tabber': Tabber
  },
  methods:{
  //   block(){
  //    if(this.show==true){
  //     this.show=false
  //   }else{
  //     this.show=true
  //   }
  // }
}
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
