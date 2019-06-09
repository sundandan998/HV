<template>
    <van-password-input
    :value="value"
    :mask="false"
    @focus="showKeyboard = true"
  />
</template>
<script>
  export default{
    data(){
      return{
        value:'123'
      }
    }
  }
</script>