<template>
   <div class="release">
       <div class="fabu">
           <span class="btn" @click="createBlog">发布</span>
       </div>
       <div class="container">
            <at-ta :members="members" name-key="fullName">
                <template v-slot:item="s">
                <img :src="s.item.picture" />
                <span>{{ s.item.nickName }} - {{ s.item.userName }}</span>
                </template>
                <span class="callwho">提醒谁看</span>
                <textarea
                id="textarea"
                type="textarea"
                v-model="fullcontent"
                ></textarea>
            </at-ta>     
            <div id="edit"></div>       
       </div>
   </div>
</template>
<script>
import AtTa from "vue-at/dist/vue-at-textarea";
import { req_follow } from "../network/relation/index.js"
import { req_createBlog } from "../network/blog/index.js"
import E from "wangeditor"
export default {
      name: "Release",
      components: {
         AtTa
      },
      created() {
          this.getFollowList()
      },
      mounted() { 
          this.init();
      },
      data() {
          return {
              fullcontent: "",
              members:[],
              user: this.$store.state.userInfo,
              editor: {},
          }
      },
      methods: {
          init() {
             this.editor = new E("#edit")
             this.editor.config.menus = [
                'foreColor',
                'emoticon',
                'image',
                'fullscreen' 
             ]
            this.editor.create()
          },
          getFollowList() {
            req_follow(this, {userId: this.user.id}).then(res => {
                 this.members = res.data.userList.map((item) => {
                    let target = {};
                    Object.assign(target, item);
                    target.fullName = target.nickName + " - " + target.userName;
                    return Object.assign(item, target);
                 });
            })
          },
          createBlog() {
              let value = document.getElementById("textarea").value
              let content = `${value} ${this.editor.txt.text()}`
              req_createBlog(this, {content}).then(res => {
                  if(res.errno == 0) {
                      this.$notify({
                        message: '发布成功',
                        color: '#ad0000',
                        background: '#fff',
                     })
                     this.fullcontent = "";
                     this.editor.txt.clear()
                  }
              })
          }
      }
  }
</script>
<style lang="scss">
.release { 
     padding: 12px;
    .fabu {
        width: 100%;
        height: 40px;  
        .btn {
          float: right;
          padding: 8px 16px;
          font-size: 12px;
          color: #fff;
          background-color: #c04d00;
          margin-right: 3px;
          margin-top: 12px;
          border-radius: 12px;
        }
    }
    .container {
        box-sizing: border-box;
        .atwho-wrap {
            .callwho {
               display:block;
               font-size: 12px;
               color: #333;
               padding-bottom: 12px;
            }
            textarea {
                 width:100%;
                 border: 1px solid rgba(0, 0, 0, .4);
                 line-height: 30px;
                 padding-left: 12px;
                 box-sizing: border-box;
                 font-size: 12px;
             }
        }
        .atwho-view {
             bottom: -110px !important;
             left: -20px !important;
             .atwho-ul {
                .atwho-li {
                    img {
                    height: 100%;
                    width: auto;
                    transform: scale(0.8);
                    border-radius: 50%;
                    }
                    span {
                    padding-left: 8px;
                    }
                }
             }   
        }
    }
}
</style>