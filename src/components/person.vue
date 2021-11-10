<!--
 * @Date: 2021-11-09 10:51:29
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\components\person.vue
-->
<template>
    <div class="person">
        <div class="container" @click="personal(userName)">
          <img :src="ava" alt="">
           <div class="info">
                <span class="nickName">{{nickName}}</span>
                <span class="content">此人很懒啥都没写</span>
           </div>
          <span :class="['btn', state? '': 'active']" v-if="show" @click.stop="isfollow(state, id)">{{text}}</span>
      </div> 
    </div>
</template>
<script>
import { req_unfollow, req_guangzu } from "../network/relation/index.js";
export default {
  name: "person",
  props: {
    ava: String,
    nickName: String,
    flag: Boolean,
    id: Number,
    show: Boolean,
    userName: String,
  },
  data() {
    return {
      text: "",
      state: this.flag
    };
  },
  watch: {
    state: {
      handler() {
        this.text = this.state ? "已关注" : "关注";
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    isfollow(state, userId) {
      if (state) {
        req_unfollow(this, {
          userId,
        }).then(res => {
          if (res.errno == 0) {
             this.state = false;
          }
        });
      } else {
        req_guangzu(this, {
          userId,
        }).then(res => {
          if (res.errno == 0) {
             this.state = true;
          }
        });
      }
    },
    personal(userName) {
      this.$router.push({
         path: "/personal",
         query: {
           name: userName
         }
      })  
    }
  },
};
</script>
<style lang="scss" scoped>
.person {
  .container {
    position: relative;
    display: flex;
    height: 60px;
    margin-bottom: 6px;
    padding: 6px 8px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .info {
      .nickName {
        display: block;
        font-size: 18px;
        line-height: 30px;
        width: 100px;
        white-space: nowrap; /*先强制一行内显示文本*/
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /*文字用省略号代替超出部分*/
      }
      .content {
        font-size: 14px;
      }
    }
    .btn {
      position: absolute;
      margin-left: 100px;
      font-size: 12px;
      color: #333;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 3px 8px;
      right: 10px;
    }
    .active {
      color: #fff;
      background-color: #c04d00;
      border: 1px solid #c04d00;
    }
  }
}
</style>