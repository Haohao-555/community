<!--
 * @Date: 2021-11-01 16:26:00
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Index.vue
-->
<template>
  <div class="index">
    <van-sticky :offset-top="0">
        <van-search
          v-model="value"
          shape="round"
          background="#c04d00"
          placeholder="请输入搜索关键词"
          @change="search"
        />
    </van-sticky>
  
    <div class="nav">
      <div :class="['item', type==0? 'active': '']" @click="type=0">广场</div>
      <div :class="['item', type==1? 'active': '']" @click="type=1">关注</div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <div class="container">
          <div  v-for="(item, index) in list" :key="index">
            <card
            :content="item.content"
            :created="item.createdAtFormat"
            :id="item.id"
            :nickName="item.user.nickName"
            :picture="item.user.picture"
            :userName="item.user.userName"
            :imgList="imgList"
            @shape="shape"
            :shapeflag=true
          />
          </div>
      </div>
    </van-pull-refresh>
   
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onselect"
     />
  </div>
</template>
<script>
import { req_picture, req_blog, req_AttenBlog } from "../network/blog/index.js";
import card from "../components/card.vue";
export default {
  name: "Index",
  data() {
    return {
      // 图片数组
      imgList: [],
      list: [],
      blogList: [],
      attenList: [],
      domObj: {},
      page: 0,
      type: 0,
      attenPage: 0,
      isLoading: false,
      value: "",
      end: false,

      userInfo: this.$store.state.userInfo,

      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    };
  },
  components: {
    card,
  },
  watch: {
    type: function() {
      if (this.type == 0) {
        this.getBlog();
      } else {
        this.getAttenBlog();
      }
    },
  },
  created() {
    this.getBlog();
    this.getImg();
  },
  mounted() {
    this.init();
  },
  methods: {
    reset() {
      this.blogList = [];
      this.attenList = [];
      this.page = 0;
      this.attenPage = 0;
      this.end = false;
    },
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
            this.getAttenBlog();
          }
        }
      };
    },
    getBlog() {
      if(!this.end) {
         this.$toast({
           message: "正在拼命加载中",
           icon: 'https://i.loli.net/2021/11/04/E7vqYcZxmIfW5sA.png',
         })
          req_blog(this, {
            page: this.page,
          }).then(res => {
            this.isLoading = false;
            this.list = [];
            let data = res.data.blogList;
            this.blogList = this.blogList.concat(data);
            this.list = this.blogList;
            this.page++;
            if (data.length == 0) {
              this.$toast({
                message: "到底啦！！",
              })
              this.end = true;
            }
          });
      }else {
        this.end = true;
        this.$toast({
          message: "到底啦！！",
        })
      }
     
    },
    getImg() {
      req_picture(this, {
        page: 20,
      }).then(res => {
        this.imgList = res.list.slice(0, 9);
      });
    },
    getAttenBlog() {
      if(!this.end) {
        this.$toast({
           message: "正在拼命加载中",
           icon: 'https://i.loli.net/2021/11/04/E7vqYcZxmIfW5sA.png',
         })
        req_AttenBlog(this, {
          page: this.attenPage,
        }).then(res => {
          this.isLoading = false;
          this.list = [];
          let data = res.data.blogList;
          this.attenList = this.attenList.concat(res.data.blogList);
          this.list = this.attenList;
          this.attenPage++;
          if (data.length == 0) {
            this.$toast({
              message: "到底啦！！",
            })
            this.end = true;
          }
      });
      }else {
        this.end = true;
        this.$toast({
          message: "到底啦！！",
        })
      }
    },
    search() {
     this.$toast({
       message: "未开发",
       icon: "https://i.loli.net/2021/11/04/FHtGTaU1opeuAch.png"
     })
      
    },
    onRefresh() {
      this.reset();
      if(this.type == 0) {
        this.getBlog()
      }else {
        this.getAttenBlog();
      }
    },
    shape(id) {
      console.log("博客ID 为",id);
      this.showShare = true;
    },
    onselect(option) {
       console.log("选择分享的渠道为",option.name);
       this.$toast({
          message: "未开发",
          icon: "https://i.loli.net/2021/11/04/FHtGTaU1opeuAch.png"
       })
       this.showShare = false;
    }
  },
  beforeDestroy() {
    this.domObj.onscroll = null;
  },
};
</script>
<style lang="scss" scoped>
.index {
  .nav {
    display: flex;
    width: 90vw;
    margin: 10px auto;
    .item {
      width: 50%;
      padding: 6px 0px;
      border: 1px solid #c04d00;
      text-align: center;
      margin-bottom: 20px;
    }
    .active {
      background-color: #c04d00;
      color: #fff;
    }
  }
}
</style>