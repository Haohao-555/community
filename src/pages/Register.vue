<!--
 * @Date: 2021-11-02 19:16:56
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Register.vue
-->
<template>
  <div class="register">
    <div class="bg"></div>
    <div class="container">
      <div class="form-container" v-if="!loginState">
        <div class="title">注册</div>
        <div class="row">
          <input type="text" placeholder="请输入账号" v-model="userName">
        </div>
        <div class="row">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="row"> 
          <input type="password" placeholder="请再次输入密码" v-model="password1">
        </div>
        <div class="row"> 
           <div class="option">
              <input type="radio" value="3" v-model="gender" id="secrecy"> 
              <label for="secrecy">保密</label>
           </div>
           <div class="option">
              <input type="radio" value="1"  v-model="gender" id="boy"> 
              <label for="boy">男</label>
           </div>
          <div class="option">
              <input type="radio" value="2"  v-model="gender" id="girl"> 
              <label for="girl">女</label>
           </div>
        </div>
        <button @click="register" class="btn">注册</button>
      </div>
      <div class="login" v-if="loginState">
        <div class="ava">
            <img :src="avaUrl" alt="">
          </div>
          <div class="info">
              <span>朋友您已登录</span>
              <span @click="back">返回到主页</span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { req_register, req_existAccount } from "../network/user/index.js";
import constant from "../conf/constant";
export default {
  name: "Register",
  data() {
    return {
      userName: "",
      password: "",
      password1: "",
      gender: 3,

      // 用户名是否存在
      isExistUserName: false,
      // 两次密码是否一致
      isExistPassword: true,

      loginState: false,
      avaUrl: "",
    };
  },
  // 属性监听（判断用户名是否存在，及密码是否一致）
  watch: {
    userName: function() {
      req_existAccount(this, {
        userName: this.userName,
      }).then(res => {
        if (res.errno == 10003) {
          this.isExistUserName = false;
        } else {
          this.isExistUserName = true;
          this.$message({
            showClose: true,
            message: "存在相同用户名",
            type: "warning",
          });
        }
      });
    },
    password: function() {
      if (this.password === this.password1) {
        this.isExistPassword = true;
      } else {
        this.isExistPassword = false;
      }
    },
    password1: function() {
      if (this.password === this.password1) {
        this.isExistPassword = true;
      } else {
        this.isExistPassword = false;
      }
    },
    isExistPassword: function() {
      if (!this.isExistPassword) {
        this.$message({
          showClose: true,
          message: "密码不一致",
          type: "warning",
        });
      }
    },
  },
  created() {
    this.isLogin();
  },
  methods: {
    // 判断是否登录
    isLogin() {
       if(this.$cookie.get(constant.COOKIE)) {
          this.loginState = true;
       }else {
         this.loginState = false;
       }
    },
    register() {
      if (this.isExistUserName == false && this.isExistPassword == true) {
        let { userName, password, gender } = this;
        req_register(this, {
          userName,
          password,
          gender: parseInt(gender),
        }).then(res => {
          if (res.errno && res.errno == 10009) {
            this.$message.error("你可能有错误哦!");
          } else {
            this.$message.success("注册成功");
            this.$router.push("/login");
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "您可能还有错误哦！",
          type: "warning",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/community.scss";
.register {
  position: relative;
  height: 100vh;
  z-index: 3;
  .bg {
    position: absolute;
    background-size: cover;
    background-position: 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    background-image: url(https://i.loli.net/2021/11/03/QBF286mTRgdaDfJ.png);
  }
  .container {
    padding-top: 150px;
    box-sizing: border-box;
    .title {
      text-align: center;
      color: #fff;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .form-container {
      background-color: rgba($color: #000000, $alpha: 0.4);
      width: 300px;
      margin: 0 auto;
      padding: 30px 12px;
      .row {
        width: 280px;
        height: 40px;
        border: 1px solid #fff;
        margin: 0px auto 12px auto;
        input {
          background: none;
          border: none;
          display: block;
          height: 40px;
          padding-left: 20px;
          font-size: 14px;
          color: #fff;
        }
        &:nth-child(5) {
          border: none;
          @include flex();
          .option {
            width: 140px;
            @include flex(flex-start);
            label {
              font-size: 14px;
              margin-left: 12px;
            }
          }
        }
      }
      .btn {
        width: 200px;
        height: 40px;
        border-radius: 12px;
        padding: 12px 20px;
        border: none;
        background: none;
        margin: 0 auto;
        display: block;
        background-color: #c04d00;
        color: #fff;
      }
    }
    .login {
      padding-top: 100px;
      .ava {
        height: 120px;
        width: 120px;
        margin: 0px auto 30px auto;
        border-radius: 50%;
        overflow: hidden;
        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }
      }
      .info {
        color: #fff;
        span {
          display: block;
          width: 200px;
          margin: 12px auto;
          text-align: center;
          &:last-child {
            color: #c04d00;
          }
        }
      }
    }
  }
}
</style>