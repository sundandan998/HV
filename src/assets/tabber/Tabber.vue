<template>
  <mt-tabbar :selected.sync="message" fixed>
    <mt-tab-item id="index" @click.native="index">
      <img
        slot="icon"
        src="../../assets/images/index-active.svg"
        v-if="message == 'index'"
      />
      <img slot="icon" src="../../assets/images/index.svg" v-else />
      <font :class="message === 'index' ? 'color' : ''">首页</font>
    </mt-tab-item>
    <mt-tab-item id="mine" @click.native="mine">
      <img
        slot="icon"
        src="../../assets/images/mine-active.svg"
        v-if="message == 'mine'"
      />
      <img slot="icon" src="../../assets/images/mine.svg" v-else />
      <font :class="message === 'mine' ? 'color' : ''">我的</font>
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    index () {
      this.$router.push({
        name: 'Index'
      })
    },
    mine () {
      if (this.$store.getters.token !== '') {
        this.$router.push({
          name: 'Mine'
        })
      } else {
        this.$emit('showLogin')
      }
    }
  }
}
</script>
<style>
.color {
  color: #09bb07;
}
</style>
