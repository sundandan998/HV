<template>
  <div id="app">
    <mt-field
      label="用户名"
      placeholder="请输入用户名"
      v-model="form.username"
    ></mt-field>
    <mt-field
      label="邮箱"
      placeholder="请输入邮箱"
      type="email"
      v-model="form.email"
    ></mt-field>
    <mt-field
      label="手机号"
      placeholder="请输入手机号"
      type="tel"
      v-model="form.phone"
    ></mt-field>
    <mt-button size="large" :disabled="submitBtnDisabled" type="primary"
      >primary</mt-button
    >
  </div>
</template>
<script>
var vue = new Vue({
  el: '#app',
  data: {
    form: {
      username: '',
      email: '',
      phone: ''
    },
    submitBtnDisabled: true
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.username != '' && val.email != '' && val.phone != '') {
          this.submitBtnDisabled = false
        } else {
          this.submitBtnDisabled = true
        }
      }
    }
  }
})
</script>
