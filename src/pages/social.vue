<!--
 * @Date: 2021-11-09 10:21:58
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\social.vue
-->
<template>
    <div class="social">
        <nav-header>
            <template v-slot:title>
                <span
                    @click="type=1"
                    :class="[type==1? 'active':'']"
                >粉丝</span>
                    <span
                        @click="type=2"
                        :class="[type==2? 'active': '']"
                    >关注</span>
            </template>
            <template v-slot:ava>
                <img
                    :src="user.picture"
                    alt=""
                >
            </template>
        </nav-header>
        <div class="container">
            <div class="item" v-if="type==1">
                <person
                    v-for="(item, index) in fanmy"
                    :key="index"
                    :id="item.id"
                    :ava="item.picture"
                    :nickName="item.nickName"
                    :flag="false"
                    :show="false"
                />
                <person
                    v-for="(item, index) in fanList.userList"
                    :key="index"
                    :id="item.id"
                    :ava="item.picture"
                    :nickName="item.nickName"
                    :flag="item.flag"
                    :show="true"
                    @isfollow="isfollow"
                />
            </div>
            <div class="item" v-if="type==2">
                <person
                    v-for="(item, index) in followermy"
                    :key="index"
                    :id="item.id"
                    :ava="item.picture"
                    :nickName="item.nickName"
                    :flag="false"
                    :show="false"
                />
                <person
                    v-for="(item, index) in followerList.userList"
                    :key="index"
                    :id="item.id"
                    :ava="item.picture"
                    :nickName="item.nickName"
                    :flag="item.flag"
                    :show="true"
                    @isfollow="isfollow"
                />
            </div>
        </div>
    </div>
</template>
<script>
import navHeader from "../components/navHeader";
import person from "../components/person";
import { req_unfollow, req_guangzu } from "../network/relation/index.js";
import tools from "../tools/index.js";
export default {
  name: "social",
  components: {
    navHeader,
    person,
  },
  data() {
    return {
      type: this.$route.query.type,
      followerList: JSON.parse(sessionStorage.getItem("followerList")),
      fanList: JSON.parse(sessionStorage.getItem("fanList")),
      user: JSON.parse(sessionStorage.getItem("user")),

      currentUserInfo: this.$store.state.userInfo,
      currentUserFollowerList: this.$store.state.followerList.userList,
      fanmy: [],
      followermy: [],
    };
  },
  watch: {
    "fanList.userList": {
      handler() {
        // 移除掉自己
        let index = this.fanList.userList.findIndex(
          item => item.id == this.currentUserInfo.id
        );
        if (index != -1) {
          this.fanmy = this.fanList.userList.splice(index, 1);
        }
        
        this.fanList.userList.forEach((item, index, arr) => {
            let flag = tools.isexit(item, this.currentUserFollowerList);
            arr[index].flag = flag;  
        });   
        
      },
      immediate: true,
    },
    "followerList.userList": {
      handler() {
        // 移除掉自己
        let index = this.followerList.userList.findIndex(
          item => item.id == this.currentUserInfo.id
        );
        if (index != -1) {
          this.followermy = this.followerList.userList.splice(index, 1);
        }
 
        this.followerList.userList.forEach((item, index, arr) => {
            let flag = tools.isexit(item, this.currentUserFollowerList);
            console.log(flag)
            arr[index].flag = flag;
        });
            
      
      },
      immediate: true,
    },
  },
  methods: {
    isfollow(state, userId, ava, nickName) {
      if (state) {
        req_unfollow(this, {
          userId,
        }).then((res) => {
           if(res.errno == 0) {
              let i = this.currentUserFollowerList.findIndex(item => item.id == userId)
              this.currentUserFollowerList.splice(i, 1);
           } 
        });
      } else {
        req_guangzu(this, {
          userId,
        }).then((res) => {
          if(res.errno == 0) {
            this.currentUserFollowerList.push({
                id: userId,
                nickName,
                picture: ava
            })
          } 
         
        });
      }
    },
  },
};
</script>
<style lang="scss">
.social {
  .container {
    .item {
      margin-top: 12px;
    }
  }
}
</style>