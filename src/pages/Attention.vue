<template>
  <div class="attention">
      <van-sticky :offset-top="0">
        <nav-header :show="false">
          <template v-slot:title>
            <span>{{userInfo.nickName}}</span>
          </template>
          <template v-slot:ava>
              <img :src="userInfo.picture" alt="">
          </template>
        </nav-header>
      </van-sticky>    
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">  
        <div class="container">
              <card
              v-for="(item, index) in blogList"
              :key="index"
              :content="item.content"
              :created="item.createdAtFormat"
              :id="item.id"
              :nickName="item.user.nickName"
              :picture="item.user.picture"
              :userName="item.user.userName"
              :imgList="imgList"
              :shapeflag=true
            />
        </div>
      </van-pull-refresh>
  </div>
</template>
<script>
import { req_callBlog } from "../network/blog/index.js"
import card from "../components/card";
import navHeader from "../components/navHeader"
export default {
  name: "Attention",
  components: {
    card,
    navHeader
  },
  data() {
    return {
       page: 0, 
       blogList: [], 
       imgList:[], 
       userInfo: this.$store.state.userInfo,
       domObj: {},
       isEmpty: false,
       isLoading: false   
    }
  },
  created() {
     this.getcallBlog();
  },
  mounted() {
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
        if (Math.floor(clientHeight) + Math.ceil(scrollTop) == scrollHeight) {
          if (this.type == 0) {
            this.getBlog();
          } else {
            this.getcallBlog();
          }
        }
      };
    },
    reset() {
      this.page = 0;
      this.isEmpty = false;
      this.blogList = [];
    },
    getcallBlog() {
      this.$toast({
          message: "正在拼命加载中",
          icon: 'https://i.loli.net/2021/11/04/E7vqYcZxmIfW5sA.png',
      })
      req_callBlog(this, {page: this.page}).then(res => { 
        if(!this.isEmpty) {
             this.blogList = this.blogList.concat(res.data.blogList);
             this.isEmpty = res.data.isEmpty;
             this.page++;
        }else {
           this.$toast({
            message: "到底啦！！",
           })
        }
        this.isLoading = false;
      })
    },
    onRefresh() {
        this.reset();
        this.getcallBlog();
    }
  },
  beforeDestroy() {
    this.domObj.onscroll = null;
  },
};
</script>
<style lang="scss" scoped>
 .attention {
   .container {
     margin-top: 14px;
   }
 }
</style>