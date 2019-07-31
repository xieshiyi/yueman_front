<template>
  <div>
    <!-- 顶部海报 -->
    <div class="header clearfix">
      <div class="hd">
        <img :src="list[0] && list[0].cover_image">
      </div>
      <div class="bd Js_btn_goback" v-on:click="goback">&nbsp;</div>
      <div class="mask">&nbsp;</div>
      <div class="ft">
        <div class="ft-title">
          <span class="overhidden">{{title}}</span>
        </div>
        <div class="ft-content clearfix">
          <div class="ft-content-follow">
            <span class="overhidden">460万人关注</span>
          </div>
          <div class="info clearfix">
            <div class="ft-content-praise">
              <span class="overhidden">1863万</span>
            </div>
            <div class="ft-content-message">
              <span class="overhidden">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顺序选择，倒叙还是正序 -->
    <div class="operator">
      连载中<span class="btn" v-on:click="changeSort" v-loading.fullscreen.lock="fullscreenLoading">{{sort === -1 ? '倒序' : '正序'}}</span>
    </div>
    <!-- 目录 -->
    <template>
      <div class="content-container">
        <ul v-for="item in list" :key="item._id" >
          <a v-bind:href="'#/detail/' + item._id">
            <li>
              <div class="item clearfix">
                <div class="item-left overhidden">
                  <div class="img" :style="{background: 'url('+ item.cover_image +')',backgroundSize: 'cover'}"></div>
                  <!-- <img :src="item.cover_image"> -->
                </div>
                <div class="item-right ">
                  <p class="overhidden title">第{{item.no}}话 {{item.title}}</p>
                  <div class="info">
                    <span class="info-update ">{{item.create_time|moment("MM-DD")}}更新</span>
                    <div class="praise">
                      <img src="https://static3w.kuaikanmanhua.com/static/img/webmobile/icon-praise-black-v3_224461b.png">
                      <span class="info-cnt overhidden">{{item.like_num}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </template>
    <!-- 开始/继续阅读 -->
    <div v-if="list && list.length">
      <div class="start-btn" v-if="history">
        <div class="title">{{history.no}} {{history.title}}</div>
        <a class="btn" v-bind:href="'#/detail/' + history._id">继续阅读</a>
      </div>
      <div v-else class="start-btn">
        <div class="title">{{sort === -1 ? list[list.length - 1].no : list[0].no}} {{sort === -1 ? list[list.length - 1].title : list[0].title}}</div>
        <a class="btn" v-bind:href="'#/detail/' + (sort === -1 ? list[list.length - 1]._id : list[0]._id)">开始阅读</a>
      </div>
    </div>
  </div>
</template>
<script>
import CommonService from "@/service/common.js"
import book from "@/components/Book/Book"
import local from "@/utils/localdata"
export default {
  name: 'Contents',
  data () {
    return {
      list: [],
      history: null,
      sort: -1,    //排序方式，默认是倒叙
      title: this.$route.params.bookname
    }
  },
  components: {

  },
  methods: {
    _getContents: function() {
      let t = this;
      this.fullscreenLoading = true;
      CommonService.getBookContents(t.$route.params.bookid, t.sort).then(({data}) => {
        t.list = data.data.list
        this.fullscreenLoading = false
      });
      t.history = local.getLocalData('history')[t.$route.params.bookid]
      console.log(t.history)
    },
    goback: function() {
        this.$router.go(-1)
    },
    changeSort: function() {
      this.sort = -1 * this.sort;
      this._getContents()
    }
  },
  created: function() {
    this._getContents()
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
@import url(./Contents.css)
</style>