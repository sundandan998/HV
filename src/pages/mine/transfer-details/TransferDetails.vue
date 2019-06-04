<template>
  <div class="details-list">
    <!-- <div>
      <span>类型</span>
      <span>日期</span>
    </div> -->
    <!-- <div v-for="(item, index) in dataList" :key="index"> -->
    <router-link to="/detail">
      <mt-cell title="消费" value="-2000" label="2019-01-01 14:24"></mt-cell>
      <mt-cell title="消费" value="-2000" label="2019-01-01 14:24"></mt-cell>
    </router-link>
    <!-- </div> -->
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        
      }
    },
    created() {
      document.title = '明细'
      this.details()
    },
    methods: {
      // 明细
    details(){
      api.details().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss'
</style>