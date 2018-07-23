<template>
  <div class="container">
    <!-- 头部控制 -->
    <div class="menu-bar">
      <div class="back Js_btn_goback" v-on:click="goback" data-href>返回</div>
      <div class="tit">第{{detail.no}}话 {{detail.title}}</div>
      <div class="btn"><a v-bind:href="'#/contents/' + detail.bookid" class="goto">全集</a></div>
    </div>
    <!-- 内容 -->
    <div class="content" v-loading.fullscreen.lock="fullscreenLoading">
    <template v-for="item in detail.content_images">
        <img :src="item" :key="item"/>
    </template>
      </div>

  </div>
</template>
<script>
import CommonService from "@/service/common.js"
import book from "@/components/Book/Book"
export default {
  name: 'Contents',
  data () {
    return {
      detail: {}
    }
  },
  components: {

  },
  methods: {
    _getDetail: function() {
      let t = this;
      this.fullscreenLoading = true
      CommonService.getBookDetails(t.$route.params.id).then(({data}) => {
        t.detail = data.data.chapter[0]
        this.fullscreenLoading = false
      });
    },
    goback: function() {
        this.$router.go(-1)
    }
  },
  created: function() {
    this._getDetail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
<style scoped lang="css">
@import url(./Detail.css)
</style>