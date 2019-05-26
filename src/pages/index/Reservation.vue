<template>
  <div class="reservation">
    <div class="reservation-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back">预约信息</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <!-- 主体部分 -->
    <div class="reservation-body">
      <div class="reservation-body-per">
        <mt-cell title="预约人" label="张三" class="fl"></mt-cell>
        <mt-cell title="联系电话" label="13325625984" class="fr"></mt-cell>
      </div>
      <div class="reservation-body-per">
        <mt-cell title="服务名称" label="免疫细胞存储" class="fl"></mt-cell>
        <mt-cell title="所需积分" label="20,000" class="fr"></mt-cell>
      </div>
      <div class="reservation-body-time">
        <mt-field
          label="预约时间"
          placeholder="请输入生日"
          type="date"
        ></mt-field>
      </div>
    </div>
    <div class="reservation-btn">
      <mt-button size="large">确认</mt-button>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
