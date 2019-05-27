<template>
  <div class="my-appointment">
    <div class="my-appointment-header">
      <!-- 头部header -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back">我的预约</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-appointment-body">
      <div>
        <mt-field label="2019-09-09" readonly="readonly">
          <mt-button size="small">取消</mt-button>
        </mt-field>
        <mt-field label="免疫细胞存储" placeholder="30000" readonly="readonly">
          <span>已预约</span>
        </mt-field>
      </div>
      <div class="cancel">
        <mt-field label="2019-09-09" readonly="readonly">
          <mt-button size="small">申请撤销</mt-button>
        </mt-field>
        <mt-field label="免疫细胞存储" placeholder="30000" readonly="readonly">
          <span>已受理</span>
        </mt-field>
      </div>
      <div>
        <mt-field label="2019-09-09" readonly="readonly">
          <mt-button size="small">再次预约</mt-button>
        </mt-field>
        <mt-field label="免疫细胞存储" placeholder="30000" readonly="readonly">
          <span>已完成</span>
        </mt-field>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
@import '../../assets/scss/Global.scss';
</style>
