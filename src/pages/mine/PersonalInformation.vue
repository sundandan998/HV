<template>
  <div class="information">
    <div class="information-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back">个人信息</mt-button>
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
        <mt-cell title="手机号" value="136****7661" is-link></mt-cell>
        <mt-cell title="微信号" value="zhangsan" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
