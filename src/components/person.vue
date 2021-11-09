<template>
   <div class="person">
      <div class="container">
          <img :src="ava" alt="">
           <div class="info">
                <span class="nickName">{{nickName}}</span>
                <span class="content">此人很懒啥都没写</span>
           </div>
          <span :class="['btn', flag? '': 'active']" v-if="show" @click="isfollow(flag, id, ava, nickName)">{{text}}</span>
      </div> 
   </div>
</template>
<script>

   export default {
       name: "person",
       props: {
          ava: String,
          nickName: String,
          flag: Boolean, 
          id: Number,
          show: Boolean
       },
       data() {
         return {
             text: "",
         }
       },
       watch: {
           flag: {
               handler() {
                 this.text = this.flag ? "已关注" : "关注"
               },
               immediate: true,
               deep: true,
           }
       },
       methods: {
         isfollow(flag, id, ava, nickName) {
            this.$emit("isfollow", flag, id, ava, nickName);
         }
       }
   }
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