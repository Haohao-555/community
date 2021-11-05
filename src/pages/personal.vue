<template>
   <div class="personal">
      
   </div>
</template>
<script>
import { req_info } from "../network/user/index.js";
import { req_provideBlog } from "../network/blog/index.js";
import { req_fan, req_follow } from "../network/relation/index.js";
  export default {
      name: "personal",
      data() {
          return {
              userName: this.$route.query.name,
              userInfo: {},
              pageIndex: 0,
              blogList: [],
              fan: {},
              follwer: {},
          }
      },
      created() {
          this.getUserInfo()
      },
      mounted() {
         this.getBlog();
      },
      methods: {
        // 获取当前页面主人信息
        getUserInfo() {
            req_info(this, {
                userName: this.userName
            }).then(res => {
                this.userInfo = res.data;
                this.getFan();
                this.getFollwer();
            })
        },
        // 获取当前页面主人博客
        getBlog() {
           req_provideBlog(this, {
               userName: this.userName,
               pageIndex: this.pageIndex
           }).then(res => {
               this.blogList = this.blogList.concat(res.data.blogList);
               this.pageIndex++;
           })
        },
        // 获取当前页面主人粉丝
        getFan() {
            req_fan(this, {
                userId: this.userInfo.id
            }).then(res => {
                this.fan = res.data
                
            })
        },
        // 获取当前主人关注
        getFollwer() {
            req_follow(this, {
                  userId: this.userInfo.id
            }).then(res => {
                this.follwer = res.data;
            }) 
        }
      }
  }
</script>
<style lang="scss">
    .personal {
  
    }
</style>