<template>
  <div class="login">  
        <div class="container" v-if="!loginState">
            <img src="https://i.loli.net/2021/11/11/3okYagjKtFWeiIQ.png" alt="">
            <div class="account row">
                <input type="text" name="" id="" v-model="account" placeholder="请输入账号">
            </div>
            <div class="password row">
                <input type="password" v-model="password" placeholder="请输入密码">
            </div>
            <button @click="login" class="btn">登录</button>
            <span class="register" @click="register">没有账号？ 立即注册</span>
        </div>
        <div class="container" v-if="loginState">
            <div class="ava">
              <img :src="user.picture" alt="">
            </div>
            <div class="info">
                <span class="content">{{user.nickName}}</span>
                <span class="content">您已登录</span>
                <span class="back" @click="back">主页</span>
            </div>
        </div>
  </div>
</template>
<script>
import { req_login } from "../network/user/index.js";
import constant from "../conf/constant";
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      user: {
        id: 0,
        city: "",
        nickName: "",
        picture: "",
        userName: "",
      },
      loginState: false,
      avaUrl: ""
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    // 判断是否登录
    isLogin() {
       if(this.$cookie.get(constant.COOKIE)) {
          this.loginState = true;
          this.user = this.$store.state.userInfo;
       }else {
         this.loginState = false;
       }
    },
    // 登录
    login() {
      let { account, password } = this;
      if (account.length == 0 || password.length == 0) {
        this.$notify({
          message: '数据不能为空',
          color: '#ad0000',
          background: '#fff',
        })
      } else {
        req_login(this, {
          userName: account,
          password,
        }).then(res => {
          this.$store.dispatch("saveUserInfo", res.data);
          if (res.errno == 0) {
            this.$router.push({
              path: "/index",
            });
          }else {
            this.$notify({
              message: '"账号或密码错误',
              color: '#ad0000',
              background: '#fff',
            })
          }
        }).catch(error => {
            console.log(error);
        });
      }
    },
    // 注册
    register() {
      this.$router.push({
        path: "/register"
      })
    },
    back() {
      this.$router.push({
        path: '/index',
      })
    }
  },
};
</script>
<style lang="scss">
.login {
  height: 100vh;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  padding-top: 140px;
  .container {
    width: 90vw;
    margin: 0px auto;
    padding-top: 10px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 2px 2px 3px rgba($color: #000000, $alpha: .4);
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: block;
      margin: 0px auto 20px auto;
    }
    .ava {
      height: 120px;
      width: 120px;
      margin: 0px auto 30px auto;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }
    }
    .row {
      width: 280px;
      height: 40px;
      margin: 0 auto;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #333;
      margin-bottom: 30px;
      input {
        background: none;
        border: none;
        display: block;
        height: 40px;
        padding-left: 20px;
        font-size: 14px;
        color: #000;
      }
    }
    .btn {
      width: 200px;
      line-height: 40px;
      border-radius: 12px;
      border: none;
      background: none;
      margin: 0 auto;
      display: block;
      background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
      color: #fff;
      padding: 6px;
    }
    .info {
      color: #333;
      span {
        display: block;
        margin: 12px auto;
        text-align: center;
        margin-bottom: 6px;
        font-size: 12px;
        &:first-child {
           color: #c04d00;
        }
      }
      .back {
         font-size: 18px;
         padding-bottom: 20px;
      }
    }
    .register {
      display: block;
      width: 200px;
      height: 40px;
      margin: 12px auto;
      font-size: 15px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>