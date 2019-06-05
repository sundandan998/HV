<template>
  <div class="appointment-detail">
    <div class="my-appointment-body-top">
      <mt-cell title="接收服务时间" :value="detailData.appointment_date"></mt-cell>
      <mt-cell title="订单号" :value="detailData.order_id"></mt-cell>
    </div>
      <div class="my-appointment-body-phone">
        <mt-cell title="预约人" :value="detailData.name"></mt-cell>
        <mt-cell title="联系电话" :value="detailData.mobile"></mt-cell>
      </div>
       <div class="my-appointment-body-phone">
      <mt-cell title="服务名称" :value="detailData.service_title"></mt-cell>
      <mt-cell title="价格" :value="detailData.price"></mt-cell>
    </div>
  </div>
</template>
<script>
// 接口请求
import api from '@/api/order/order.js'
export default {
  data () {
    return {
      detailData: ''
    }
  },
  created () {
    document.title = '预约详情'
    this.orderDetail()
    this.detailDataId = this.$route.params
  },
  methods: {
    orderDetail () {
      api.orderDetail(this.$route.params).then(res => {
        this.detailData = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss'
</style>
