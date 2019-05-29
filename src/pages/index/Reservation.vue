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
      <mt-cell title="预约人" :value="this.detail.name"></mt-cell>
      <mt-cell title="联系电话" :value="this.detail.mobile"></mt-cell>
      <mt-cell title="服务名称" :value="this.$route.params.title"></mt-cell>
      <mt-cell title="价格" :value="this.$route.params.integral"></mt-cell>
      <div class="reservation-body-time">
        <mt-field
          label="预约时间"
          placeholder=""
          type="date"
          v-model="add.appointment_date"
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
import { mapGetters } from 'vuex'
// 接口请求
import api from '@/api/order/order.js'
export default {
  data() {
    return {
      add: {
        name: '张三',
        mobile: '18713351004',
        service_id: 1,
        appointment_date: ''
      }
    }
  },
  created() {},
  methods: {
    success() {
      api
        .addOrder(this.add)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      Toast({
        message: '预约成功'
      })
    }
  },
  computed: {
    ...mapGetters(['detail'])
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
