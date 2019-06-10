<template>
  <div class="reservation">
    <!-- 主体部分 -->
    <div class="reservation-body">
      <mt-cell title="预约人" :value="add.name" v-model="add.name"></mt-cell>
      <mt-cell title="联系电话" :value="add.mobile" v-model="add.mobile"></mt-cell>
    </div>
    <div class="reservation-body-price">
      <mt-cell title="服务名称" :value="detail.title" class="reservation-title"></mt-cell>
      <mt-cell title="价格" :value="parseInt(detail.integral)"></mt-cell>
    </div>
    <!-- <div class="reservation-body-time">
      <mt-field label="预约时间" type="date" v-model="add.appointment_date" ></mt-field>
    </div> -->
    <div class="reservation-btn">
      <mt-button size="large" @click="success" class="sure">确认</mt-button>
      <router-link to="/">
        <mt-button size="large" class="cancel">取消</mt-button>
      </router-link>
    </div>
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" /> 
        <span>输入支付密码</span>
        <p>服务预约</p>
        <p>20000(积分)</p>
        <van-password-input :value="value" @focus="showKeyboard= true"/>
      </mt-popup>  
    </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
      :show="showKeyboard"
      extra-key="."
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
// 接口请求
import api from '@/api/order/order.js'
export default {
  data () {
    return {
      detail: {},
      value:'',
      showKeyboard:false,
      resevationModelModel:'',
      search: {
        page: 1,
        page_size: 6
      },
      date: {
        pickerVisible: '',
        startDate: new Date(),
        time: ''
      },
      add: {
        name: this.$store.getters.userInfo.data.name,
        mobile: this.$store.getters.userInfo.data.mobile,
        service_id: this.$route.params.id,
        appointment_date: ''
      }
    }
  },
  created () {
    document.title = '预约信息'
    this.rowData()
    // this.detail = this.$route.params.list[this.$route.params.id - 1]
    // this.$route.params.list.map(item => {
    //   if (item.id === this.$route.params.id) {
    //     this.detail = item
    //   }
    // })
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    modalHide(){
      this.resevationModelModel = false
    },
    success (id) {
      this.resevationModelModel = true
      // this.$messagebox({
      //   title: '预约',
      //   message: '预约成功后,将扣减对应数量积分<p>确定预约？</p>',
      //   cancelButtonText: '否',
      //   confirmButtonText: '是',
      //   showCancelButton: true
      // }).then(action => {
      //   if (action === 'confirm') {
      //     api.addOrder(this.add).then(res => {
      //       Toast({
      //         message: res.msg
      //       })
      //       this.$router.push({
      //         name: 'Myappointment'
      //       })
      //       // this.$Indicator.close()
      //     }).catch(err => {
      //       Toast({
      //         message: err.msg
      //       })
      //       // this.$Indicator.close()
      //     })
      //   }
      // })
    },
    // 返回上一页
    rowData () {
      if (JSON.stringify(this.$route.params) !== '{}') {
        this.$route.params.list.map(item => {
          if (item.id === this.$route.params.id) {
            this.detail = item
          }
        })
      } else {
        this.$router.go(-1)
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss'
</style>
