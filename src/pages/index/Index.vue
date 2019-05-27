<template>
  <div class="index">
    <div class="index-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)">首页</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="index-body">
      <mt-cell title="服务名称">
        <span class="price">价格</span>
        <!-- <mt-button size="small">预约</mt-button> -->
      </mt-cell>
      <mt-cell title="免疫细胞存储">
        <span class="integral">30000</span>
        <mt-button size="small" @click="modalShow">预约</mt-button>
      </mt-cell>
      <mt-cell title="脂肪干细胞存储">
        <span class="integral">30000</span>
        <router-link to="reservation">
          <mt-button size="small">预约</mt-button>
        </router-link>
      </mt-cell>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup
        v-model="popupVisible"
        :closeOnClickModal="clickfalse"
        @click="modalHide"
      >
        <span>HV认证</span>
        <img
          class="fr"
          @click="modalHide"
          src="../../assets/images/cancel.svg"
          alt=""
        />
        <mt-field
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
          v-model="phone"
          :state="NameStatus"
          @blur.native.capture="sendCode"
          :attr="{ maxlength: 11 }"
        ></mt-field>
        <mt-field label="用户名" placeholder="" v-model="username"></mt-field>
        <mt-field
          @blur.native.capture="changeBtn"
          label="身份证号"
          placeholder=""
          type=""
          v-model="number"
          :attr="{ maxlength: 18 }"
        ></mt-field>
        <mt-button size="large" id="disbtn">认证</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import Tabber from '../../assets/tabber/Tabber.vue'
export default {
  data() {
    return {
      selected: 'index',
      message: 'index',
      readonly: true,
      phone: '',
      username: '',
      number: '',
      NameStatus: '',
      clickfalse: false,
      popupVisible: false,
      show: false,
      attr: ''
    }
  },
  components: {
    'app-tabber': Tabber
  },
  created() {
    this.modalHide()
    // console.log(this.phone.value)
  },
  methods: {
    // 手机号校验
    sendCode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (!reg.test(this.phone)) {
        this.NameStatus = 'error'
      } else {
        this.NameStatus = 'success'
      }
    },
    // 按钮变色
    changeBtn() {
      if (this.phone != '' || this.username != '' || this.number != '') {
        document.getElementById('disbtn').style.background = '#09bb07'
      }
    },
    // 模态框显示
    modalShow() {
      this.popupVisible = true
    },
    // 模态框隐藏
    modalHide() {
      this.popupVisible = false
      // debugger
      if (this.phone != '' || this.username != '' || this.number != '') {
        console.log('15')
      }
    }
  },
  watch: {
    attr() {
      if (this.attr.length == '18') {
        console.log('15')
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
