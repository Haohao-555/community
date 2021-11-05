<template>
    <div class="updatepaw">
        <van-nav-bar
            title="修改密码"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="info">
            <img :src="user.picture" alt="">
        </div>
         <van-field
            v-model="oldPaw"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{  message: '请填写原本密码' }]"
         />
         <van-field
            v-model="newPaw"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{  message: '请填写新密码' }]"
         />
         <button class="btn" @click="updatePaw">修改密码</button>
    </div>
</template>
<script>
import { req_changePaw } from "../network/user/index.js";
export default {
  name: "Updatepaw",
  data() {
    return {
      newPaw: "",
      oldPaw: "",
      user: this.$store.state.userInfo,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    updatePaw() {
      if (this.oldPaw.trim() && this.newPaw.trim()) {
        req_changePaw(this, {
          password: this.oldPaw,
          newPassword: this.newPaw,
        })
          .then(res => {
            if (res.errno && res.errno == 10006) {
              this.$notify({
                message: "旧密码错误",
                color: "#ad0000",
                background: "#fff",
              });
            } else {
              this.newPaw = "";
              this.oldPaw = "";
              this.$notify({
                message: "修改密码成功",
                color: "#ad0000",
                background: "#fff",
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
          this.$notify({
            message: "数据不能为空",
            color: "#ad0000",
            background: "#fff",
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.updatepaw {
  .info {
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: block;
      margin: 20px auto;
    }
  }
  .btn {
    background-color: #c04d00;
    color: #fff;
    padding: 10px;
    border: none;
    display: block;
    margin: 12px auto;
    border-radius: 12px;
    font-size: 14px;
  }
}
.van-nav-bar {
  .van-icon {
    color: #c04d00;
  }
  .van-nav-bar__text {
    color: #c04d00;
  }
  .van-nav-bar__title {
    color: #c04d00;
  }
}
</style>