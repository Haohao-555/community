<!--
 * @Date: 2021-11-02 15:43:03
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\components\navFooter.vue
-->
<template>
  <ul class="nav-footer">
      <li >
        <span :class="['iconfont', 'icon-sdance',index==0? 'active': '']" @click="go(0)"></span>
      </li>
      <li >
        <span :class="['iconfont', 'icon-redianguanzhu', index==1? 'active': '']" @click="go(1)"></span>
      </li>
      <li>
         <span></span>
      </li>
      <li >
        <span :class="['iconfont', 'icon-xiuxianlingshi', index==2? 'active': '']" @click="go(2)"></span>
      </li>
      <li>
         <span :class="['iconfont', 'icon-jingwuicon_svg-', index==3? 'active': '']" @click="go(3)"></span>
      </li>
  </ul>
</template>
<script>
export default {
  name: "NavFooter",
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    go(index) {
      this.index = index;
      let path;
      if (index == 0) {
        path = "/index";
      } else if (index == 1) {
        path = "/attention";
      } else if (index == 2) {
        path = "/leisure";
      } else if (index == 3) {
        path = "/private";
      }
      this.$router.push({
        path,
      })
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/community.scss";
@import "../assets/scss/icon.scss";
.nav-footer {
  @include flex();
  background-color: #c04d00;
  height: 48px;
  position: fixed;
  width: 100%;
  bottom: 0;
  li {
    color: #fff;
    flex-basis: 20%;
    flex-grow: 1;
    flex-shrink: 0;
    text-align: center;
    height: 48px;
    text-align: center;
    padding-top: 12px;
    box-sizing: border-box;
    span {
       display: block;
       width: 20%;
       font-size: 20px;
       height: 48px;
       padding-left: 20px;
    }
    &:nth-child(3) {
       background-color: red;
       height: 120px;
       border-top-left-radius: 40px;
       border-top-right-radius: 40px;
    }
  }
  // .active {
  //   color: #c04d00;
  // }
 
}
</style>