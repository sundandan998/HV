<template>
  <div class="information">
    <div class="information-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >个人信息</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="information-body">
      <div class="information-body-top">
        <mt-cell title="姓名" value="张三"></mt-cell>
        <mt-cell title="性别" value="男"></mt-cell>
        <mt-cell title="身份证号码" value="130******8"></mt-cell>
      </div>
      <div class="information-body-bot">
        <mt-cell
          title="手机号"
          value="136****7661"
          is-link
          @click.native="modalShow"
        ></mt-cell>
        <mt-cell
          title="微信号"
          value="zhangsan"
          is-link
          @click.native="remove"
        ></mt-cell>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="modal">
      <mt-popup v-model="popupVisible" :closeOnClickModal="clickfalse">
        <span>更换手机号</span>
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
          @blur.native.capture="sendcode"
          :attr="{ maxlength: 11 }"
        ></mt-field>
        <mt-field placeholder="验证码">发送</mt-field>
        <mt-button size="large" @click="success">确定</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      clickfalse: false,
      popupVisible: false,
      NameStatus: '',
      phone: ''
    }
  },
  methods: {
    // 手机号校验
    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (!reg.test(this.phone)) {
        this.NameStatus = 'error'
      } else {
        this.NameStatus = 'success'
      }
    },
    modalShow() {
      this.popupVisible = true
    },
    success() {
      this.popupVisible = false
      Toast({
        message: '更换成功'
      })
    },
    modalHide() {
      this.popupVisible = false
    },
    // 解绑微信弹框
    remove() {
      this.$messagebox({
        title: '解绑微信',
        message: '账号已绑定当前微信,是否解绑',
        cancelButtonText: '否',
        confirmButtonText: '是',
        showCancelButton: true
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
