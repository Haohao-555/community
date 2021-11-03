<!--
 * @Date: 2021-11-01 16:26:00
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Index.vue
-->
<template>
  <div class="index">
    <div class="nav">
      <div
        :class="['item', type==0? 'active': '']"
        @click="type=0"
      >广场</div>
    <div
      :class="['item', type==1? 'active': '']"
      @click="type=1"
    >关注</div>
  </div>
  <div class="container">
    <card
      v-for="(item, index) in list"
      :key="index"
      :content="item.content"
      :created="item.createdAtFormat"
      :id="item.id"
      :nickName="item.user.nickName"
      :picture="item.user.picture"
      :userName="item.user.userName"
      :imgList="imgList"
      :flag=isEmpty
    />
  </div>

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
      isEmpty: true,
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
      req_blog(this, {
        page: this.page,
      }).then(res => {
        this.list = [];
        let data = res.data.blogList;
        this.blogList = this.blogList.concat(res.data.blogList);
        this.list = this.blogList;
        this.page++;
        if (data.length == 0) {
          this.$message({
            showClose: true,
            message: "已经到底了",
            type: "warning",
          });
        }
      });
    },
    getImg() {
      req_picture(this, {
        page: 20,
      }).then(res => {
        this.imgList = res.list.slice(0, 9);
      });
    },
    getAttenBlog() {
      req_AttenBlog(this, {
        page: this.attenPage,
      }).then(res => {
        this.list = [];
        let data = res.data.blogList;
        this.attenList = this.attenList.concat(res.data.blogList);
        this.list = this.attenList;
        this.attenPage++;
        if (data.length == 0) {
          this.$message({
            showClose: true,
            message: "已经到底了",
            type: "warning",
          });
        }
      });
    },
  },
  beforeDestroy() {
    this.domObj.onscroll = null;
  },
};
</script>
<style lang="scss" scoped>
.index {
  padding-top: 20px;
  .nav {
    display: flex;
    width: 90vw;
    margin: 0 auto;
    .item {
      width: 50%;
      height: 20px;
      padding: 6px 0px;
      border: 1px solid #c04d00;
      line-height: 20px;
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