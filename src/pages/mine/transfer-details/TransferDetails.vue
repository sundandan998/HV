<template>
  <div class="details-list">
    <!-- <div>
      <span>类型</span>
      <span>日期</span>
    </div> -->
    <p v-if="show" class="null-data">暂无数据</p>
    <div v-for="(item, index) in detailsList" :key="index">
      <router-link :to="/flow/+ item.id">
        <mt-cell :title="item.transaction_type == 0 ? '转入' :item.transaction_type == 100 ? '转出'
      :item.transaction_type == 200 ? '赠送' :item.transaction_type == 300 ? '消费':'退回'" 
      :value="item.payment_type===1?'+'+item.amount :'-'+item.amount" :label="item.transaction_time"></mt-cell>
      </router-link>
    </div>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        show: false,
        detailsList: []
      }
    },
    created() {
      document.title = '明细'
      this.details()
    },
    methods: {
      // 明细
      details() {
        api.details().then(res => {
          // debugger
          this.detailsList = res.data

          if (this.detailsList.length === 0) {
            this.show = true
          }
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