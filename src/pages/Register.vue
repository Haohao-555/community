<!--
 * @Date: 2021-11-02 19:16:56
 * @Author: 浩
 * @LastEditors: 浩
 * @FilePath: \community\src\pages\Register.vue
-->
<template>
  <div class="register">
    <div class="bg"></div>
    <div :class="['container', loginState? '' : 'pad']">
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
              <input type="radio" value="1" v-model="gender" id="boy">
              <label for="boy">男</label>
            </div>
            <div class="option">
              <input type="radio" value="2" v-model="gender" id="girl">
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
          <div class="ava">
            <img :src="user.picture" alt="">
          </div>
          <span>{{user.nickName}}您已登录</span>
          <span @click="back">主页</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  req_register,
  req_existAccount,
} from "../network/user/index.js";
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

      user: {
        id: 0,
        city: "",
        nickName: "",
        picture: "",
        userName: "",
      },
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
           this.$notify({
              message: '存在相同账号',
              color: '#ad0000',
              background: '#fff',
           })
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
         this.$notify({
              message: '密码不一致',
              color: '#ad0000',
              background: '#fff',
          })
      }
    },
  },
  created() {
    this.isLogin();
  },
  methods: {
    // 判断是否登录
    isLogin() {
      if (this.$cookie.get(constant.COOKIE)) {
        this.loginState = true;
        this.user = this.$store.state.userInfo;
      } else {
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
             this.$notify({
              message: '你可能有错误哦!',
              color: '#ad0000',
              background: '#fff',
            })
          } else {
            this.$notify({
              message: "正在跳转到登录页",
              color: "#ad0000",
              background: "#fff",
            })
            this.$router.push("/login");
          }
        });
      } else {
         this.$notify({
            message: '你可能有错误哦!',
            color: '#ad0000',
            background: '#fff',
         })
      }
    },
    back() {
      this.$router.push({
        path: "/index",
      });
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
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #c04d00;
  }
  .container {
    box-sizing: border-box;
    .form-container {
      .title {
        text-align: center;
        color: #fff;
        line-height: 30px;
        margin-bottom: 20px;
      }
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
              color: #fff;
            }
          }
        }
      }
      .btn {
        width: 200px;
        height: 40px;
        border-radius: 12px;
        border: none;
        background: none;
        margin: 0 auto;
        display: block;
        background-color: #c04d00;
        color: #fff;
      }
    }
    .login {
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
        color: #fff;
        span {
          display: block;
          width: 200px;
          margin: 12px auto;
          text-align: center;
          &:last-child {
            color: #fff;
          }
        }
      }
    }
  }
  .pad {
    padding-top: 120px;
  }
}
</style>