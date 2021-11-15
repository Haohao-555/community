<template>
    <div class="newContent">
        <nav-header>
          <template v-slot:title>
             <span>{{content.title}}}</span>
          </template>
        </nav-header>
       <div class="container">
           <h3>{{content.title}}</h3>
           <span class="public">出版商 - {{content.src}}</span>
           <span class="time">{{content.time}}</span>
           <img :src="content.pic" alt="">
           <div class="content" v-html="content.content"></div>
       </div>
    </div>
</template>
<script>
import navHeader from "../components/navHeader"
export default {
    name: "newContent",
    components: {
        navHeader
    },
    data() {
        return {
            content: JSON.parse(window.sessionStorage.getItem("content"))
        }
    }
}
</script>
<style lang="scss">
    .newContent {
        .container {
            padding: 12px;
            box-sizing: border-box;
            h3 {
                line-height: 30px;
                margin-bottom: 12px;
            }
            .public {
                font-size: 14px;
                display: block; 
                margin-bottom: 6px;
            }
            .time {
                font-size: 12px;
                display: block; 
                margin-bottom: 6px; 
            }
            img {
                display: block;
                margin: 12px auto;
                width: 100%;

            }
            .content {
                .art_p {
                    line-height: 30px;
                    margin-bottom: 20px;
                }
                .art_img_tit {
                    font-size: 16px;
                }
                figure {
                  img {
                    display: block;
                    margin: 12px auto;
                    width: 100%;
                   }
                }
              
            }
        }
    }
</style>
