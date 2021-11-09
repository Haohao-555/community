<template>
    <div class="personal">
      <van-sticky :offset-top="0">
        <nav-header v-if="navshow">
          <template v-slot:title>
            <span>{{userInfo.nickName}}</span>
          </template>
          <template v-slot:ava>
              <img :src="userInfo.picture" alt="">
          </template>
        </nav-header>
      </van-sticky>  
        <div class="mask"></div>
        <div class="container">
            <div class="info">
                <div class="ava">
                    <img :src="userInfo.picture" alt="">
                </div>
                <div class="call" v-if="userName != currentUserInfo.userName">
                    <span :class="['content', guanzhu? 'active' : '']" @click="isfollow">{{text}}</span>
                    <span class="iconfont icon-tongxin- icon"></span>
                </div>
                <div class="private" v-if="userName == currentUserInfo.userName">
                    <span class="content">编辑个人信息</span>
                </div>
                <span class="name">{{userInfo.nickName}}</span>
            </div>
            <div class="social">
               <div class="fan" @click="social(1)">
                   <div class="count">{{fan.count}}</div>
                   关注TA的
               </div>
               <div class="follow" @click="social(2)">
                   <div class="count">{{follwer.count}}</div>
                   TA关注的
               </div>
            </div>
            <div class="city">
               现居 - <span class="town">{{userInfo.city}}</span>
            </div>
            <div class="tab">
                <span>前端</span>
                <span>码龄 1 年</span>
            </div>
            <div class="bloglist">
                <card
                    v-for="(item, index) in blogList" :key="index"
                    :content="item.content"
                    :created="item.createdAtFormat"
                    :id="item.id"
                    :nickName="item.user.nickName"
                    :picture="item.user.picture"
                    :userName="item.user.userName"
                    :imgList="imgList"
                    :shapeflag="false"
                />
            </div>
            <div class="nodata" v-if="nodata">已经到底了</div>
        </div>
    </div>
</template>
<script>
import { req_info } from "../network/user/index.js";
import { req_provideBlog, req_picture } from "../network/blog/index.js";
import { req_fan, req_follow,  req_unfollow, req_guangzu} from "../network/relation/index.js";
import card from "../components/card";
import navHeader from "../components/navHeader";
export default {
  name: "personal",
  components: {
    card,
    navHeader,
  },
  data() {
    return {
      userName: this.$route.query.name,
      userInfo: {},
      currentUserInfo: this.$store.state.userInfo,
      pageIndex: 0,
      blogList: [],
      fan: {},
      follwer: {},
      imgList: [],
      domObj: {},
      navshow: false,
      guanzhu: false,
      text: "",
      nodata: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  watch: {
    guanzhu:  {
      handler() {
         if(this.guanzhu) {
           this.text = "取消关注"
         }else {
           this.text = "关注"
         }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getBlog();
    this.getImg();
    this.init();
  },
  methods: {
    init() {
      document.documentElement.scrollTop = 0;
      this.domObj = window;
      this.domObj.onscroll = () => {
        // 滚动视口高度(也就是当前元素的真实高度)
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        // 可见区域高度
        let clientHeight =
          this.domObj.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        // 滚动条顶部到浏览器顶部高度
        let scrollTop =
          this.domObj.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
          if(scrollTop > 100) {
              this.navshow = true;
          }else if(scrollTop < 100) {
             this.navshow = false;
          }
        if (Math.floor(clientHeight) + Math.ceil(scrollTop) == scrollHeight) {
           this.getBlog();
        }
      };
    }, 
    social(type) {
      window.sessionStorage.setItem("fanList", JSON.stringify(this.fan));
      window.sessionStorage.setItem("followerList", JSON.stringify(this.follwer));
      window.sessionStorage.setItem("user", JSON.stringify(this.userInfo));
      this.$router.push({
        path: "/social",
        query: {
           type,
        }
      })
    },
    // 获取当前页面主人信息
    getUserInfo() {
      req_info(this, {
        userName: this.userName,
      }).then(res => {
        this.userInfo = res.data;
        this.getFan();
        this.getFollwer();
      });
    },
    // 获取当前页面主人博客
    getBlog() {
      this.$toast({
           message: "正在拼命加载中",
           icon: 'https://i.loli.net/2021/11/04/E7vqYcZxmIfW5sA.png',
      })
      req_provideBlog(this, {
        userName: this.userName,
        pageIndex: this.pageIndex,
      }).then(res => {
        console.log();
        if(res.data.blogList.length != 0) {
           this.nodata = false;
           this.blogList = this.blogList.concat(res.data.blogList);
           this.pageIndex++;
        }else {
           this.nodata = true;
        }
        
      });
    },
    // 获取当前页面主人粉丝
    getFan() {
      req_fan(this, {
        userId: this.userInfo.id,
      }).then(res => {
        this.fan = res.data;
        if(this.userName != this.currentUserInfo.userName) {
            this.guanzhu = this.fan.userList.some((item) => {
               return item.userName == this.currentUserInfo.userName;
            });
        }
      });
    },
    // 获取当前主人关注
    getFollwer() {
      req_follow(this, {
        userId: this.userInfo.id,
      }).then(res => {
        this.follwer = res.data;
      });
    },
    getImg() {
      req_picture(this, {
        page: 20,
      }).then(res => {
        this.imgList = res.list.slice(0, 9);
      });
    },
    onClickLeft() {
        this.$router.back(-1);
    },
    isfollow() {
      if(this.guanzhu) {
          req_unfollow(this, {
            userId: this.userInfo.id
          }).then(res => {
            if(res.errno == 0) {
               this.guanzhu = false;
               this.$notify({
                message: '已取消关注',
                color: '#ad0000',
                background: '#fff',
              })
            }
          })
      }else {
          req_guangzu(this, {
            userId: this.userInfo.id
          }).then(res => {
            if(res.errno == 0) {
               this.guanzhu = true;
               this.$notify({
                  message: '已关注',
                  color: '#ad0000',
                  background: '#fff',
               })
            }
          }) 
      }
    }
  },
  beforeDestroy() {
    this.domObj.onscroll = null;
  },
};
</script>
<style lang="scss">
@import "../assets/scss/icon.scss";
.personal {
  position: relative;
  height: 100vh;
  .mask {
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    z-index: -1;
    height: 180px;
  }
  .container {
    width: 100%;
    position: absolute;
    top: 160px;
    left: 0;
    background-color: #fff;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    .info {
        position: relative;
        .ava {
            width: 100px;
            height: 100px;
            background-color: #fff;
            padding: 5px;
            box-sizing: border-box;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: -40px;
            img {
            width: 90px;
            height: 90px;
            border-radius: 50%; 
            }
        } 
        .name {
            margin-left: 12px;
            font-size: 16px;
        }
        .call {
          position: absolute;
          right: 20px;
          top: 60px;
          font-size: 12px;
          color: #333;
          .content {
            padding: 6px 8px;
            color: #fff;
            border-radius: 6px;
            margin-right: 12px;
            background-color: #c04d00;
          }
          .active {
            background-color: #fff;
            border: 1px solid #333;
            color: #333;
          }
          .icon {
              font-size: 16px;
              color: #333;
          }
        }
        .private {
            position: absolute;
            right: 20px;
            top: 60px;
            font-size: 12px;
            color: #333;
           .content {
                padding: 6px 8px;
                color: #fff;
                border-radius: 6px;
                margin-right: 12px;
                background-color: #c04d00;
            }
        }
    } 
 
    .social {
       display: flex;
       margin-top: 12px;
       margin-left: 12px;
       .fan {
            display: flex;
            font-size: 8px;
            color: #333;
            margin-right: 20px;
          .count {
              font-size: 14px;
              color: #000;
              margin-right: 5px;
          }
       }
       .follow {
           display: flex;
           font-size: 8px;
           color: #333;
          .count {
              font-size: 14px;
              color: #000;
              margin-right: 5px;
          }
       }
    }
    .city {
        margin-left: 12px;
        font-size: 12px;
        margin-top: 12px;
        font-size: 10px;
        color: #333;
       .town {
          font-size: 14px;
          color: #000;
       }
    }
    .tab {
        margin-left: 12px;
        margin-top: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .1);
        span {
            padding: 4px;
            background-color: #c04d00;
            font-size: 8px;
            color: #fff;
            border-radius: 3px;
            margin-right: 6px;
        }
    }
    .bloglist {
        margin-top: 20px;
    }
    .nodata {
      text-align: center;
      font-size: 12px;
      margin-top: -20px;
    }
  }
}

</style>