<template>
  <div class="reservation">
    <div class="reservation-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >预约信息</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <!-- 主体部分 -->
    <div class="reservation-body">
      <mt-cell title="预约人" value="张三"></mt-cell>
      <mt-cell title="联系电话" value="13325625984"></mt-cell>
      <mt-cell title="服务名称" value="免疫细胞存储"></mt-cell>
      <mt-cell title="价格" value="20,000"></mt-cell>
      <div class="reservation-body-time">
        <mt-field
          label="预约时间"
          placeholder="请输入生日"
          type="date"
        ></mt-field>
      </div>
    </div>
    <div class="reservation-btn">
      <mt-button size="large" @click="success">确认</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {}
  },
  methods: {
    success() {
      Toast({
        message: '预约成功'
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
