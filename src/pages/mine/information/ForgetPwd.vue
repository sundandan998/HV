<template>
    <div class="forget-pwd">
      <div class="forget-pwd-content">
      <span>忘记支付密码,需要联系客服重置</span>
      <span>按客服需求提供相关材料</span>
      <p>客服电话:400-756-8888</p>
    </div>
    </div>
</template>
<script>
export default{
  data(){
    return{

    }
  },
  created () {
    document.title = '忘记支付密码'
  },
}
</script>
<style>
.forget-pwd{
  /* background-color: #fff; */
}
.forget-pwd-content{
  margin-top: 50px;
  margin: 50px auto;
  width: 63%;
}
.forget-pwd-content span{
  margin-top: 5px;
  display: block;
}
</style>