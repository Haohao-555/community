<!--
 * @Date: 2021-11-02 16:07:17
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Leisure.vue
-->
<template>
  <div class="leisure">
    <div class="container">
       <van-notice-bar
            left-icon="volume-o"
            text="目前该页面数据为假数据，后期会进行完善成真实数据"
            style="background-color: #c04d00;"
            color="#fff"
        />
         <div class="item" v-for="(item, index) in newList" :key="index" @click="detail(index)">
            <div class="content">
              <h3>{{item.title}}</h3>
              <span class="publish">{{item.src}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <img :src="item.pic" alt="">
         </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "Leisure",
  data() {
    return {
      channelList: [],
      newList: [],
    };
  },
  created() {
    this.getchannel();
    this.getNew();
  },
  methods: {
    getchannel() {
      this.axios.get("/mock/channel").then(res => {
        this.channelList = res;
      });
    },
    getNew() {
      this.axios.get("/mock/new").then(res => {
        this.newList = res.result.list;
      });
    },
    detail(index) {
       window.sessionStorage.setItem("content", JSON.stringify(this.newList[index]));
       this.$router.push({
         path: "/newContent",
       })
    }
  },
};
</script>
<style lang="scss" scoped>
.leisure {
  .container {
    .item {
      height: 130px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      padding: 6px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
      &:last-child {
        margin-bottom: 42px;
      }
      .content {
        h3 {
          font-size: 16px;
          height: 60px;
          line-height: 30px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .publish {
          display: block;
          font-size: 12px;
          margin-top: 12px;
        }
        .time {
          display: block;
          font-size: 12px;
          margin-top: 12px;
        }
      }
      img {
        width: 108px;
        height: 108px;
      }
    }
  }
}
</style>