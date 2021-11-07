<template>
    <div class="updatepaw">
        <nav-header>
          <template v-slot:title>
             <span>修改密码</span>
          </template>
        </nav-header>
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
import navHeader from "../components/navHeader";
export default {
  name: "Updatepaw",
  components: {
    navHeader,
  },
  data() {
    return {
      newPaw: "",
      oldPaw: "",
      user: this.$store.state.userInfo,
    };
  },
  methods: {
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
</style>