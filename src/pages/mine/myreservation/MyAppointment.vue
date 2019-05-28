<template>
  <div class="my-appointment">
    <div class="my-appointment-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >我的预约</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-appointment-body">
      <div v-for="(item, index) in orderData" class="order-list">
        <router-link :to="/detail/ + item.id">
          <mt-cell :title="item.appointment_date" readonly="readonly">
            <mt-button size="small">取消</mt-button>
          </mt-cell>
          <mt-cell :title="item.service_title" readonly="readonly">
            <span class="integral">{{ item.price }}</span
            ><span>已预约</span>
          </mt-cell>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
// 接口请求
import api from '@/api/order/order.js'
export default {
  data() {
    return {
      orderData: '',
      list: {
        page: 1,
        page_size: 6,
        ordering: ''
      }
    }
  },
  created() {
    this.orderList()
  },
  methods: {
    orderList() {
      api
        .orderList(this.list)
        .then(res => {
          this.orderData = res.data
          console.log(this.orderData)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
@import '../../../assets/scss/Global.scss';
</style>
