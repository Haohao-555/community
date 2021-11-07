<!--
 * @Date: 2021-11-02 18:53:04
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\components\card.vue
-->
<template>
  <div class="card">
        <div class="card-container">
         <div class="info" @click="personal(userName)">
            <img :src="picture" alt="">
            <span class="nickname">{{nickName}}</span>
         </div>
         <div class="time">{{created}}</div>
         <div class="text">
            <p>{{content}}</p>
         </div>
         <div class="img-container">
           <van-grid :column-num="3" square :border="false">
             <van-grid-item v-for="(item, index) in imgList" :key="index">
                  <img  :src="item.url" alt="">
             </van-grid-item>
           </van-grid>
          </div>
          <div class="communit" v-if="shapeflag">
              <span class="iconfont icon-fenxiang shape" @click="shape(id)">分享</span>
              <span class="iconfont icon-pinglun discus">1</span>
              <span class="iconfont icon-dianzan call">12</span>
          </div>
       </div>
  </div>
</template>
<script>
  export default {
      name: "card",
      props: {
        id: Number,
        content: String,
        created: String,
        nickName:  String,
        picture: String,
        userName: String,
        imgList: Array,
        shapeflag: Boolean,
      },
      methods: {
        shape(id) {
          this.$emit("shape", id);
        },
        personal(userName) {
          console.log(this.$route.fullPath);
          if(this.$route.fullPath == `/personal?name=${userName}`) {
             this.$notify({
                message: '当前正处在该页面',
                color: '#ad0000',
                background: '#fff',
              })
          }else {
             this.$router.push({
                path: `/personal`,
                query: {
                  name: userName
                }
             })
          }
          
        }
      }
  }
</script>
<style lang="scss" scoped>
@import "../assets/scss/icon.scss";
    .card {
      .card-container {
        position: relative;
        width: 90vw;
        margin: 0 auto;
        padding: 6px;
        margin-bottom: 12px; 
         .info{
           display: flex;
           img {
             display: block;
             width: 40px;
             height: 40px;
             border-radius: 50%;
           }
           .nickname {
             font-size: 14px;
             height: 40px;
             line-height: 30px;
             margin-left: 6px;
             &:hover {
               color: #c04d00;
             }
           }
         }
         .time{
            position: absolute;
            top: 34px;
            left: 50px;
            font-size: 10px;
            color: #333;
         }
         .text{
            margin-top: 12px;
            font-size: 13px;
            line-height: 24px;
            text-align: justify;
            padding: 0px 10px;
         }
         .img-container{
           margin: 12px auto;
           width: 318px;
           .van-grid {
             .van-grid-item {
               .van-grid-item__content {
                  img {
                    width: 100px;
                    height: 100px;
                  }
               }
             }
           }
         }
         .communit {
           height: 30px;
           display: flex;
           font-size: 12px;
           color: #333;
           line-height: 30px;
           padding: 0px 12px;
           span {
              flex: 1;
              margin-left: 12px;
              padding-left: 12px;
           }
         }
      }
    }
</style>