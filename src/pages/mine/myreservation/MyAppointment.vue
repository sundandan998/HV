<template>
  <div class="my-appointment">
    <div class="my-appointment-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" v-on:click="$router.go(-1)"
            >我的预约</mt-button
          >
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-appointment-body">
      <div>
        <mt-cell title="2019-09-09" readonly="readonly" to="detail">
          <mt-button size="small">取消</mt-button>
        </mt-cell>
        <mt-cell title="免疫细胞存储" readonly="readonly" to="detail">
          <span class="integral">30000</span><span>已预约</span>
        </mt-cell>
      </div>
      <div class="cancel">
        <mt-cell title="2019-09-09" readonly="readonly" to="detail">
          <mt-button size="small">申请撤销</mt-button>
        </mt-cell>
        <mt-cell title="免疫细胞存储" readonly="readonly" to="detail">
          <span class="integral">30000</span><span>已受理</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="2019-09-09" readonly="readonly" to="detail">
          <mt-button size="small">再次预约</mt-button>
        </mt-cell>
        <mt-cell title="免疫细胞存储" readonly="readonly" to="detail">
          <span class="integral">30000</span><span>已完成</span>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
@import '../../../assets/scss/Global.scss';
</style>
