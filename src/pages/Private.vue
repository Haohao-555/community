<template>
  <div class="private">
    <div class="container">
      <div class="info">
        <img
          :src="user.picture"
          alt=""
        >
          <span class="nickname">{{user.nickName}}</span>
          <span class="city">城市：{{user.city}}</span>
          <div class="list">
            <div class="item">关注（12）</div>
            <div class="item">粉丝（12）</div>
            <div class="item">说说（12）</div>
            <div class="item">足迹</div>
          </div>
      </div>
      <div class="option">
        <h3>个人信息</h3>
        <span>修改个人信息</span>
        <span>修改密码</span>
      </div>
      <div class="option">
        <h3>系统设置</h3>
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Private",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.user = JSON.parse(window.localStorage.getItem("user"));
    },
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
    }
    .option {
      border-radius: 12px;
      background-color: #fff;
      padding: 10px;
      margin-bottom: 12px;
      padding: 9px;
      box-sizing: border-box;
      h3 {
        height: 30px;
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .4); 
      }
      span {
        display: block;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        padding-bottom: 6px;
        
      }
    }
  }
}
</style>
