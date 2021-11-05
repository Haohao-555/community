<template>
  <div class="login">
    <div class="bg"></div>  
        <div class="container" v-if="!loginState">
            <div class="ava">
              <img src="/img/login.png" alt="">
            </div>
            <div class="account row">
                <input type="text" name="" id="" v-model="account" placeholder="请输入账号">
            </div>
            <div class="password row">
                <input type="text" v-model="password" placeholder="请输入密码">
            </div>
            <button @click="login" class="login">登录</button>
            <span class="register" @click="register">没有账号？ 立即注册</span>
        </div>
        <div class="container" v-if="loginState">
            <div class="ava">
              <img :src="user.picture" alt="">
            </div>
            <div class="info">
                <span>{{user.nickName}}您已登录</span>
                <span @click="back">主页</span>
            </div>
        </div>
  </div>
</template>
<script>
import { req_login} from "../network/user/index.js";
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
      avaUrl: "",


    };
  },
  watch:{
    
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
@import "../assets/scss/community.scss";
.login {
  position: relative;
  height: 100vh;
  z-index: 3;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #c04d00;
  }
  .container {
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
      border: 1px solid #fff;
      margin-bottom: 30px;
      input {
        background: none;
        border: none;
        display: block;
        height: 40px;
        padding-left: 20px;
        font-size: 14px;
        color: #fff;
      }
    }
    .login {
      width: 200px;
      height: 40px;
      border-radius: 12px;
      padding: 12px 20px;
      border: none;
      background: none;
      margin: 0 auto;
      display: block;
      color: #fff;
    }
    .info {
      color: #fff;
      span {
        display: block;
        width: 200px;
        margin: 12px auto;
        text-align: center;
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