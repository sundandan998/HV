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
        <mt-button size="small" @click="modalShow">预约</mt-button>
      </mt-field>
      <mt-field label="脂肪干细胞存储" placeholder="20000" readonly="readonly">
        <mt-button size="small">预约</mt-button>
      </mt-field>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible">
        <span>HV认证</span>
        <mt-field
          label="手机号"
          placeholder="请输入手机号"
          type="number"
        ></mt-field>
        <mt-field label="验证码" type="number">发送</mt-field>
        <mt-field label="用户名" placeholder=""></mt-field>
        <mt-field label="身份证号" placeholder="" type=""></mt-field>
        <mt-button size="large" v-model="closeOnClickModal">认证</mt-button>
      </mt-popup>
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
      readonly: true,
      closeOnClickModal: true,
      popupVisible: false
    }
  },
  components: {
    'app-tabber': Tabber
  },
  methods: {
    modalShow() {
      this.popupVisible = true
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
