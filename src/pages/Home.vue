<!--
 * @Date: 2021-11-01 16:25:52
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Home.vue
-->
<template>
  <div class="home">
    <router-view></router-view>
    <nav-footer :count="count"></nav-footer>
  </div>
</template>
<script>
import navFooter from "../components/navFooter.vue";
import { req_callMy } from "../network/blog/index.js";
import { setInterval, clearInterval } from "timers";
export default {
  name: "Home",
  components: {
    navFooter,
  },
  data() {
    return {
      count: "",
      setIntervalId: 0,
    };
  },
  created() {
    this.callMy();
  },
  methods: {
    callMy() {
      this.id = setInterval(() => {
        req_callMy(this).then(res => {
          if (res.errno == 0) {
            let value = res.data.count;
            this.count = value > 0 ? "" + value : "";
          }
        });
      }, 5000);
    },
  },
  beforeDestroy() {
    clearInterval(this.id);
  },
};
</script>
<style lang="scss" scoped>
</style>