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
      <div class="health-score">
        <span>健康积分</span>
        <p>20000</p>
        <mt-button size="normal">领取</mt-button>
        <a href="">数量有误？不领取</a>
      </div>

      <mt-cell title="个人信息" to=" "is-link>
        <img slot="icon"  src="../../assets/images/information.svg">
      </mt-cell>
      <mt-cell title="我的预约" to="" is-link>
        <img  slot="icon"  src="../../assets/images/reservation.svg">
      </mt-cell>
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
      message: 'mine'
    }
  },
  components: {
    'app-tabber': Tabber
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
