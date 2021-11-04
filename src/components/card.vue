<!--
 * @Date: 2021-11-02 18:53:04
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\components\card.vue
-->
<template>
  <div class="card">
        <div class="card-container">
         <div class="info">
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
       </div>
  </div>
</template>
<script>
  export default {
      name: "card",
      props: {
        data: Array,
        id: Number,
        content: String,
        created: String,
        nickName:  String,
        picture: String,
        userName: String,
        imgList: Array,
      }
  }
</script>
<style lang="scss" scoped>
    .card {
      .card-container {
        position: relative;
        width: 90vw;
        margin: 0 auto;
        border-radius: 12px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
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
           img {
             margin-bottom: 6px;
           }
         }
        
      }
    }
</style>