<template>
  <div class="private">
    <div class="container">

      <div class="info">
        <img :src="user.picture" alt="">
          <span class="nickname">{{user.nickName}}</span>
          <span class="city">城市：{{user.city}}</span>
          <div class="personal" @click="personal">个人主页 &gt; </div>
          <div class="list">
            <div class="item" @click="follower">关注（{{followerList.count}}）</div>
            <div class="item" @click="faner">粉丝（{{fanList.count}}）</div>
            <div class="item" @click="personal">说说（{{blogCount}}）</div>
            <div class="item">足迹</div>
          </div>
      </div>
        <van-cell-group>
          <van-cell
            title="修改个人信息"
            is-link
            to="/updateInformation"
            icon="comment-o"
          />
          <van-cell
            title="修改密码"
            is-link
            icon="edit"
            to="/updatepaw"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell
            title="系统设置"
            is-link
            icon="setting-o"
          />
          <van-cell
            title="退出登录"
            is-link
            icon="revoke"
            @click="logout"
          />
        </van-cell-group>
    </div>
  </div>
</template>
<script>
import { req_provideBlog   } from "../network/blog/index.js";
import {req_logout} from "../network/user/index.js";
import constant from "../conf/constant.js";
export default {
  name: "Private",
  components: {},
  data() {
    return {
      user: this.$store.state.userInfo,
      fanList: this.$store.state.fansList,
      followerList: this.$store.state.followerList,
      blogCount: 0,
    
    };
  },
  mounted() {
     this.getBlog();
  },
  methods: {
    getBlog() {
      req_provideBlog(this, {
         userName: this.user.userName,
         pageIndex: 0,
      }).then(res => {
        this.blogCount = res.data.count;
      })
    },
    follower() {

    },
    faner() {

    },
    personal() {
      this.$router.push({
        path: "/personal",
        query: {
          name: this.user.userName
        }
      })  
    },
    logout() {
      this.$dialog.confirm({
         message: '确认退出登录吗',
      }).then(() => {
         req_logout(this).then(()=> {
            this.$cookie.delete(constant.COOKIE);
            this.$cookie.delete(constant.SESSION);
            this.$router.push("/login");
        })
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.private {
  padding: 12px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  height: 100vh;
  .container {
    margin: 0 auto;
    .info {
      position: relative;
      background-color: #fff;
      border-radius: 12px;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 12px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .nickname {
        position: absolute;
        top: 20px;
        font-size: 16px;
        margin-left: 6px;
      }
      .city {
        position: absolute;
        font-size: 12px;
        top: 54px;
        margin-left: 6px;
      }
      .list {
        margin-top: 12px;
        height: 40px;
        display: flex;
        border-top: 1px solid #f5f5f5;
        .item {
          font-size: 16px;
          flex-basis: 20%;
          flex-grow: 1;
          flex-shrink: 0;
          text-align: left;
          line-height: 40px;
          border-right: 1px solid #f5f5f5;
          &:last-child {
            border-right: none;
          }
        }
      }
      .personal {
        position: absolute;
        right: 0;
        top: 30px;
        font-size: 12px;
        line-height: 20px;
        padding: 6px 12px;
      }
    }
  }
}
</style>
