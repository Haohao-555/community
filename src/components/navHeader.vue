<template>
   <div class="nav-header">
       <div class="left" @click="back">返回</div>
       <div class="title">
          <slot name="title"></slot>
       </div>
       <div class="right">
          <slot name="ava"></slot>
       </div>
   </div>
</template>
<script>
  export default {
      name: "navHeader",
      methods: {
         back() {
           console.log("触发")
           this.$router.back(-1);
         }
      },
  }
</script>
<style lang="scss" scoped>
    .nav-header {
       position: sticky;
       top: 0;
       left: 0;
       height: 40px;
       text-align: center;
       padding: 0px 12px;
       z-index: 999;
       background-color: #fff;
       .left{
         position: relative;
         font-size: 12px;
         line-height: 40px;
         float: left;
         color: #c04d00;
         z-index: 999;
       }
       .title {
         position: absolute;
         left: 0;
         right: 0;
         margin: 0 auto;
         line-height: 40px;
         color: #c04d00;
         font-size: 14px;
       }
       .right {
         float: right;
         width: 40px;
         height: 40px;
         box-sizing: border-box;
         padding: 5px 0px;
         img {
           width: 30px;
           display: block;
           height: 30px;
           border-radius: 50%;
         }
       }
    }
</style>
