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
      <mt-cell title="预约人" :value="add.name" v-model="add.name"></mt-cell>
      <mt-cell title="联系电话" :value="add.mobile"v-model="add.mobile"></mt-cell>
      <mt-cell title="服务名称" :value="detail.title"></mt-cell>
      <mt-cell title="价格" :value="detail.integral"></mt-cell>
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
        name: this.$store.getters.userInfo.data.name,
        mobile: this.$store.getters.userInfo.data.mobile,
        service_id: this.$route.params.id,
        appointment_date: '',
        detail:{}
      }
    }
  },
  created() {
    this.detail = this.$route.params.list[this.$route.params.id-1]
    // console.log(this.detail.id)
  },
  methods: {
    success() {
      api
        .addOrder(this.add)
        .then(res => {
          Toast({
        message: res.msg
      })
        })
        .catch(err => {
          Toast({
              message: err.msg
            })
        })
      
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
