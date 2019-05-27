<template>
  <div class="appointment-detail">
    <div class="my-appointment-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >预约详情</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-appointment-body-top">
      <mt-cell title="预约单号" value="说明文字"></mt-cell>
      <mt-cell title="预约时间" value="2020-6-23"></mt-cell>
    </div>
    <div class="my-appointment-body">
      <mt-cell title="预约人" value="张三"></mt-cell>
      <mt-cell title="联系电话" value="13325625984"></mt-cell>
      <mt-cell title="服务名称" value="免疫细胞存储"></mt-cell>
      <mt-cell title="价格" value="2000"></mt-cell>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
@import '../../../assets/scss/Global.scss';
</style>
