<!--
 * @Date: 2021-11-02 15:43:03
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\components\navFooter.vue
-->
<template>
  <div class="nav-footer">
    <van-tabbar v-model="active" active-color="#c04d00"  route>
      
      <van-tabbar-item replace to="/index">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" slot-scope="props"
        :name="props.active ? icon.active_queue:icon.queue"></van-icon>
        <span>广场</span>
      </van-tabbar-item>
      
       <van-tabbar-item replace to="/leisure">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" slot-scope="props"
        :name="props.active ? icon.active_leisure:icon.leisure"></van-icon>
        <span>悠闲</span>
      </van-tabbar-item>

       <van-tabbar-item replace to="/release">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" slot-scope="props" 
        :name="props.active ? icon.active_release:icon.release"></van-icon>
        <span>发布</span>
      </van-tabbar-item>

       <van-tabbar-item :badge="num" replace to="/attention" @click="go">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" slot-scope="props"
        :name="props.active ? icon.active_attention:icon.attention"></van-icon>
        <span>信息</span>
      </van-tabbar-item>

       <van-tabbar-item replace to="/private">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" slot-scope="props"
        :name="props.active ? icon.active_private:icon.private"></van-icon>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "navFooter",
  props: {
     count: String
  },
  data() {
    return {
      active: 0,
      icon: {
        active_queue: "https://i.loli.net/2021/11/04/IabwTEyKQiqNdOv.png",
        queue: "https://i.loli.net/2021/11/04/Wx4rNkznZ1oLtcI.png",

        active_leisure: "https://i.loli.net/2021/11/04/hBfv84RUEMiswac.png",
        leisure: "https://i.loli.net/2021/11/04/mf5Taoy913nBvri.png",

        active_release: "https://i.loli.net/2021/11/04/FZuM6XnkKWrdSm2.png",
        release: "https://i.loli.net/2021/11/04/PeDOVSvuyzBFlb4.png",
       
        active_attention: " https://i.loli.net/2021/11/04/gkNJxveQFq5DHly.png",
        attention: "https://i.loli.net/2021/11/04/UpY2cmGROvtxzo8.png",

        active_private: "https://i.loli.net/2021/11/04/YM1oz4Jaw6BqtNp.png",
        private: "https://i.loli.net/2021/11/04/7AMDUbLFxaEBQVC.png"
      },
      num: this.count
    };
  },
  watch: {
     count: function() {
       this.num = this.count;
     },
     immediate: true,
     deep: true,
  },
  methods: {
     go() {
        this.num = "";
     }
  }
};
</script>
<style lang="scss" scoped>
</style>