<template>
  <div class="index">
    <div class="index-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back">首页</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="index-body">
      <mt-field
        label="服务名称"
        placeholder="所需积分"
        readonly="readonly"
      ></mt-field>
      <mt-field label="免疫细胞存储" placeholder="30000" readonly="readonly">
        <mt-button size="small">预约</mt-button>
      </mt-field>
      <mt-field label="脂肪干细胞存储" placeholder="20000" readonly="readonly">
        <mt-button size="small">预约</mt-button>
      </mt-field>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</template>
<script>
import Tabber from '../../assets/tabber/Tabber.vue'
export default {
  data() {
    return {
      selected: 'index',
      message: 'index',
      readonly: true
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
