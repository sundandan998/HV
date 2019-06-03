<template>
  <div class="reservation">
    <!-- 主体部分 -->
    <div class="reservation-body">
      <mt-cell title="预约人" :value="add.name" v-model="add.name"></mt-cell>
      <mt-cell title="联系电话" :value="add.mobile" v-model="add.mobile"></mt-cell>
    </div>
    <div class="reservation-body-price">
    <mt-cell title="服务名称" :value="detail.title"></mt-cell>
    <mt-cell title="价格" :value="detail.integral"></mt-cell>
  </div>
    <div class="reservation-body-time">
      <mt-field label="预约时间" placeholder="" type="date" v-model="add.appointment_date"></mt-field>
    </div>
    <!-- </div> -->
    <div class="reservation-btn">
      <mt-button size="large" @click="success" :disabled = disabled>确认</mt-button>
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
      disabled:true,
      add: {
        name: this.$store.getters.userInfo.data.name,
        mobile: this.$store.getters.userInfo.data.mobile,
        service_id: this.$route.params.id,
        appointment_date: '',
        detail: {}
      }
    }
  },
  created () {
    document.title = '预约信息'
    // this.detail = this.$route.params.list[this.$route.params.id - 1]
    this.$route.params.list.map(item => {
      if (item.id === this.$route.params.id) {
        this.detail = item
      }
    })
  },
  methods: {
    success (id) {       
      api.addOrder(this.add).then(res => {              
        Toast({
          message: res.msg
        })
      }).catch(err => {
       console.log(err)
      })
    }
  },
  watch:{
    add:{
      immediate: true,
      deep: true,
      handler (val) {
        if (val.appointment_date != ''){
          this.disabled=false
        }else{
          this.disabled=true
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';
</style>
