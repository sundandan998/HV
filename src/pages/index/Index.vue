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
          <mt-button size="small" @click="handleLogin">预约</mt-button>
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
          type="tel"
          v-model="form.phone"
          :state="form.NameStatus"
          @blur.native.capture="sendCode"
          :attr="{ maxlength: 11 }"
        ></mt-field>
        <mt-field label="用户名" type="tel" v-model="form.username"></mt-field>
        <mt-field
          label="身份证号码"
          type="tel"
          v-model="form.idcode"
          :state="form.idStatus"
          :attr="{ maxlength: 18 }"
        ></mt-field>
        <!-- id="disbtn" -->
        <mt-button size="large" :disabled="submitBtnDisabled">认证</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import Tabber from '../../assets/tabber/Tabber.vue'
// 接口请求
import api from '@/api/user/User.js'
export default {
  data() {
    return {
      selected: 'index',
      message: 'index',
      readonly: true,
      clickfalse: false,
      popupVisible: false,
      show: false,
      submitBtnDisabled: true,
      form: {
        phone: '',
        username: '',
        idcode: '',
        idStatus: '',
        NameStatus: ''
      },
      // 参数
      verification: {
        mobile: '18713351004',
        name: '张三',
        id_card: '130427199121230xxxx',
        asses_token: ''
      }
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
    // 预约
    handleLogin() {
      this.$store
        .dispatch('loginByCode', this.verification)
        .then(res => {
          this.$router.push('/')
          this.$Indicator.close()
        })
        .catch(err => {
          // console.log(err)
          this.$Indicator.close()
        })
    },
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
    // 身份证号验证
    idCard() {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(this.number)) {
        this.idStatus = 'error'
      } else {
        this.idStatus = 'success'
      }
    },
    // 模态框显示
    modalShow() {
      this.popupVisible = true
    },
    // 模态框隐藏
    modalHide() {
      this.popupVisible = false
    }
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.phone != '' && val.username != '' && val.idcode != '') {
          this.submitBtnDisabled = false
        } else {
          this.submitBtnDisabled = true
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
