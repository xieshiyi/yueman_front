<template>
  <div class="container">
    <!-- 头部控制 -->
    <div :class="{'menu-bar': true, 'fixedTop': isFixed}">
      <div class="back Js_btn_goback" v-on:click="goback" data-href>返回</div>
      <div class="tit">第{{detail.no}}话 {{detail.title}}</div>
      <div class="btn"><a v-bind:href="'#/contents/' + detail.bookid" class="goto">全集</a></div>
    </div>
    <!-- 内容 -->
    <div class="content" v-loading.fullscreen.lock="fullscreenLoading" v-on:click="changeFixed">
      <template v-for="item in detail.content_images">
          <img v-lazy="item" :key="item"/>
      </template>
    </div>
    
    <!-- 上一话、下一话等操作 -->
    <div v-bind:class="{'operator': true, 'fixedBottom': isFixed}" >
      <div class="operator_top"></div>
      <img class="zanshang" src="http://yueman-static.test.upcdn.net/static/forward.png" />
      <div class="operator_bottom">
        <div v-on:click="goPrev">上一篇</div>
        <div v-on:click="goNext">下一篇</div>
      </div>
    </div>
    <toast :text="message" :isShow="showToast"></toast>
  </div>
</template>
<script>
import CommonService from "@/service/common.js"
import Toast from "@/components/Toast/index"
import local from "@/utils/localdata"
export default {
  name: 'Contents',
  data(){
    return {
      detail: {},
      message: "已经没有啦!",
      showToast: false,
      isFixed: false
    }
  },
  components: {
    "toast": Toast
  },
  methods: {
    _getDetail: function() {
      let t = this;
      this.fullscreenLoading = true
      CommonService.getBookDetails(t.$route.params.id).then(({data}) => {
        t.detail = data.data.chapter
        let history = {}
        history[data.data.chapter.bookid] = {
          title: data.data.chapter.title,
          no: data.data.chapter.no,
          _id: data.data.chapter._id
        }
        local.setLocalData('history', history)
        this.fullscreenLoading = false
      });
    },
    goback: function() {
        this.$router.go(-1)
    },
    goPrev: function() {
      let t = this;
      this.fullscreenLoading = true
      CommonService.getBookDetailsByNoAndId(t.detail.bookid, t.detail.no-1).then(({data}) => {
        t.detail = data.data.chapter
        let history = {}
        history[data.data.chapter.bookid] = {
          title: data.data.chapter.title,
          no: data.data.chapter.no,
          _id: data.data.chapter._id
        }
        local.setLocalData('history', history)
        this.fullscreenLoading = false
      });
    },
    goNext: function() {
      let t = this;
      this.fullscreenLoading = true
      CommonService.getBookDetailsByNoAndId(t.detail.bookid, t.detail.no+1).then(({data}) => {
        if(data.data.chapter){
          t.detail = data.data.chapter
          let history = {}
          history[data.data.chapter.bookid] = {
            title: data.data.chapter.title,
            no: data.data.chapter.no,
            _id: data.data.chapter._id
          }
          local.setLocalData('history', history)
          this.fullscreenLoading = false
        }
        if(data.data.chapter === null){
          this.fullscreenLoading = false
          this.showToast = true
          setTimeout(()=>{
            this.showToast = false
          }, 2000)
        }
      });
    },
    changeFixed: function(){
      // this.isFixed = !this.isFixed
    }
  },
  created: function() {
    this._getDetail()
  },
  updated() {
    window.scroll(0, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-bar.fixedTop{
  position: fixed;
  top: 0;
  left: 0;
  transition: .3s;
}
.operator.fixedBottom{
  position: fixed;
  bottom: 0;
  left: 0;
  transition: .3s;
}
a {
  text-decoration: none;
  color: black;
}
</style>
<style scoped lang="css">
@import url(./Detail.css)
</style>