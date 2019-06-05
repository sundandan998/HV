<template>
  <div class="details-list-detail">
    <div class="details-list-detail-title">
      <span>{{flowData.transaction_type == 0 ? '转入'
          :flowData.transaction_type == 100 ? '转出'
          :flowData.transaction_type == 200 ? '赠送' 
          :flowData.transaction_type == 300 ? '消费':'退款'}}
        </span>
      <p>{{flowData.amount}}</p>
    </div>
    <div class="details-list-detail-information">
      <mt-cell title="订单状态" :value="flowData.status"></mt-cell>
      <mt-cell title="余额" :value="flowData.balance"></mt-cell>
      <mt-cell title="订单号" :value="flowData.order_id"></mt-cell>
      <mt-cell title="流水号" :value="flowData.serial_number"></mt-cell>
      <mt-cell title="时间" :value="flowData.transaction_time"></mt-cell>
      <mt-cell title="对方账户" :value="flowData.other_user"></mt-cell>
      <mt-cell title="类型" :value="flowData.transaction_type == 0 ? '转入'
      :flowData.transaction_type == 100 ? '转出'
      :flowData.transaction_type == 200 ? '赠送' 
      :flowData.transaction_type == 300 ? '消费':'退款'">
    </mt-cell>
    </div>
  </div>
</template>
<script>
    // 接口请求
    import api from '@/api/user/User.js'
  export default{
    data(){
      return{
        flowData:{}
      }
    },
    created(){
      this.detail()
      this.flowDataId = this.$route.params
      
    },
    methods:{
      // 详情
      detail(){
        api.detail(this.$route.params).then(res=>{
          this.flowData = res.data
          console.log(this.flowData.transaction_type)
        }).catch(err=>{
          console.log(err)
        })
      },

    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss'
</style>