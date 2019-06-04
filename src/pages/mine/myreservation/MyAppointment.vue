<template>
  <div class="my-appointment">
    <div class="my-appointment-body">
        <p v-if="show">暂无预约数据</p>
      <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100"> -->
        <div v-for="(item,index) in orderData" class="order-list" :key= index>
        
          <router-link :to="/detail/ + item.id">
            <mt-cell :title="item.appointment_date" readonly="readonly"></mt-cell>
            <mt-cell :title="item.service_title" readonly="readonly">
              <span class="integral">{{ item.price }}</span>
              <span>
                {{item.status == 0 ? '已预约' :item.status == 100 ?'已受理':item.status == 200 ?'撤销中':item.status == 300 ?'已撤销':item.status ==
                400 ?'已取消':'已完成' }}
              </span>
            </mt-cell>
          </router-link>
          <mt-button size="small" @click="edit(item)" class="fr" :style="{background:item.status==0||item.status==100||item.status==200?'#E64340':'#09bb07'}">
            {{ item.status == 0 ? '取消' :item.status == 100 ?'申请撤销':item.status == 200 ?'取消撤销':'再次预约' }}</mt-button>
        </div>
      <!-- </ul> -->
    </div>
  </div>
</template>
<script>
// 接口请求
import api from '@/api/order/order.js'
const listP = []
// import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      show: false,
      orderData: '',
      closeOnClickModal: false,
      list: {
        page: 1,
        page_size: 100,
        ordering: ''
      },
      action: {
        action: ''
      },
      loading: false
    }
  },
  created () {
    document.title = '我的预约'
    this.orderList()
    // this.edit()
    this.editData = this.$route.params
  },
  methods: {
    // 定单列表
    orderList () {
      api.orderList(this.list).then(res => {
          this.orderData = res.data
          listP.push(this.orderData)
          if (this.orderData.length === 0){
            this.show = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 修改订单状态
    edit (item) {
      // debugger
      // console.log(item)
      if (item.status === 300 || item.status === 400 || item.status === 500) {
        this.$router.push({
          name: 'Reservation',
          params: { list: [{ integral: item.price, title: item.service_title }]}
        })
        this.messagebox.closeOnClickModal = true
      }
      this.$messagebox({
        title: `${item.status === 0 ? '取消' : item.status === 100 ? '申请撤销' : item.status === 200 ? '取消撤销' : '再次预约'}订单`,
        message: `当前订单 ${item.status === 0 ? '取消' : item.status === 100 ? '申请撤销' : item.status === 200 ? '取消撤销' : '再次预约'},确定取消？`,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        showCancelButton: true
      }).then(action => {
        let actionStatus = item.status === 0 ? 0 : item.status === 100 ? 1 : item.status === 200 ? 2 : 3
        if (action === 'confirm') {
          debugger
          api.editOrder({ id: item.id, action: actionStatus }).then(res => {
            location.reload()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 下拉刷新
    // loadMore () {
    //   this.loading = true
    //   setTimeout(() => {
    //     let last = this.list[this.list.length - 1]
    //     for (let i = 1; i <= 10; i++) {
    //       this.list.push(last + i)
    //     }
    //     this.loading = false
    //   }, 2500)
    // }
  }
}
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss'
</style>
