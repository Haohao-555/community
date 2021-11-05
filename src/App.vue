<template>
  <div id="app">
     <router-view></router-view>
     
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
      // 刷新前 把数据保存到会话中 
      window.addEventListener("beforeunload",() => {
        const state = this.$store.state;
        window.sessionStorage.setItem("store", JSON.stringify(state));
      })
      // 刷新后
      this.init();
  },
  mounted() {
   
  },
  methods: {
    init() {
      // 将数据从会话中取出
      let store = window.sessionStorage.getItem("store");
      if(store) {
        // 保存用户信息
        this.$store.dispatch("saveUserInfo", JSON.parse(store).userInfo);
        this.$store.dispatch("saveFanList" ,JSON.parse(store).fansList);
        this.$store.dispatch("saveFollowerList" ,JSON.parse(store).followerList);

        sessionStorage.removeItem("store");
        this.userInfo = JSON.parse(store).userInfo;
      }
    },
   

  }
}
</script>
<style lang="scss">
@import "./assets/scss/reset.scss";
</style>
