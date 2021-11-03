<!--
 * @Date: 2021-11-01 16:25:52
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Home.vue
-->
<template>
  <div class="home">
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import navFooter from "../components/navFooter.vue";
export default {
  name: "Home",
  components: {
    navFooter,
  },
};
</script>
<style lang="scss" scoped>
</style>