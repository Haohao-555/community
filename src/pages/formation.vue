<template>
    <div class="formation">
        <nav-header>
          <template v-slot:title>
             <span>修改个人信息</span>
          </template>
        </nav-header>
        <img :src="picture" alt="">
        <div class="message">
            <h3>基本信息</h3>
            <van-cell-group>
                <van-field  
                    v-model="nickName"
                    label="昵称"
                    left-icon="user-o"
                    clearable
                    placeholder="请输入您的昵称"
                />
                <van-field
                    v-model="city"
                    clearable
                    label="城市"
                    left-icon="wap-home-o"
                    placeholder="请输入您的城市"
                    @focus="show=true"
                />
            </van-cell-group>
        </div>

        <div class="message">
            <h3>上传头像</h3>
            <van-uploader :after-read="afterRead" />
        </div>

        <button @click="update" class="btn">修改信息</button>

      
        <van-area title="城市" :area-list="areaList" value="110101"  @confirm="onSelect" v-if="show"/>
    </div>
</template>
<script>
import { req_changeUesrInfo, req_userInfo } from "../network/user/index.js";
import { areaList } from '@vant/area-data';
import navHeader from "../components/navHeader";
   export default {
       name: "Formation",
       components: {
           navHeader,
       },
       data() {
           return {
               nickName: this.$store.state.userInfo.nickName,
               city: this.$store.state.userInfo.city,
               picture: this.$store.state.userInfo.picture,
               show: false,
               fileData: "",
               areaList
           }
       },
       methods: {
           onClickLeft() {
              this.$router.back(-1); 
           },
           afterRead(file) {
             this.$notify({
                message: '未开发',
                color: '#ad0000',
                background: '#fff',
              })
              this.fileData = file;
           },
           update() {
              if(this.nickName.trim() && this.city.trim()) {
                   req_changeUesrInfo(this, {
                       nickName: this.nickName,
                       city: this.city,
                       picture: this.picture,
                   }).then(res => {
                       if(res.errno == 0) {
                         this.$notify({
                            message: '修改个人信息成功',
                            color: '#ad0000',
                            background: '#fff',
                        }) 
                        // 重新获取个人信息
                        req_userInfo(this).then(res => {
                           this.$store.dispatch("saveUserInfo", res.data);
                        })
                       }
                   })
              }else {
                  this.$notify({
                    message: '数据不能为空',
                    color: '#ad0000',
                    background: '#fff',
                  })
              }
            
           },
           onSelect(item) {
             let value = `${item[0].name} - ${item[1].name} - ${item[2].name}`;
             this.show = false;
             this.city = value;
           },
       },
   }
</script>
<style lang="scss">
    .formation {
         img {
            width: 87.9px;
            height: 87.9px;
            margin: 12px auto;
            border-radius: 50%;
            display: block;
        }
        .message {
            margin-top: 20px;
            h3 {
                font-size: 15px;
                margin-bottom: 12px;
                margin-left: 6px;
            }
            .van-uploader {
                margin-left: 6px;
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