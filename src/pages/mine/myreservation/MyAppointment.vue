<template>
  <div class="my-appointment">
    <div class="my-appointment-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)">我的预约</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-appointment-body">
      <div v-for="(item, index) in orderData" class="order-list">
        <router-link :to="/detail/ + item.id">
          <mt-cell :title="item.appointment_date" readonly="readonly">

          </mt-cell>
          <mt-cell :title="item.service_title" readonly="readonly">
            <span class="integral">{{ item.price }}</span>
            <!-- {{item.status}} -->
            <span>
              {{item.status == 0 ? '已预约' :item.status == 100 ?'已受理':item.status == 200 ?'撤销中':item.status == 300 ?'已撤销':item.status ==
              400 ?'已取消':'已完成' }}
            </span>
          </mt-cell>
        </router-link>
        <mt-button size="small" @click="edit(item)" class="fr" :style="{background:item.status==0||item.status==100||item.status==200?'#E64340':'#09bb07'}">
          {{ item.status == 0 ? '取消' :item.status == 100 ?'申请撤销':item.status == 200 ?'取消撤销':item.status == 300 ?'再次预约':item.status
          == 400 ?'再次预约':'再次预约' }}</mt-button>
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
        },
        action: 0
      }
    },
    created() {
      this.orderList()
      // this.edit()
      this.editData = this.$route.params
    },
    methods: {
      // 定单列表
      orderList() {
        api.orderList(this.list)
          .then(res => {
            this.orderData = res.data
            // console.log(this.orderData[0].status)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 修改订单状态
      edit(item) { 
        if(item.status==300||item.status==400||item.status==500){
          this.$router.push({
            name:'Reservation'        
          })  
          this.messagebox.close()
        } 
        this.$messagebox({
          title: `${ item.status == 0 ? '取消' :item.status == 100 ?'申请撤销':item.status == 200 ?'取消撤销'
          :'再次预约' }订单`,         
          message:`当前订单${ item.status == 0 ? '取消' :item.status == 100 ?'申请撤销':item.status == 200 ?'取消撤销'
          :'再次预约' },确定取消？`,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            api.editOrder({ id: item.id, action: 0 }).then(res => {
              console.log(res)
              history.go(0) 
            }).catch(err => {
              console.log(err)
            })
          }
        })                
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss'
</style>