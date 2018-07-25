<template>
  <div>
    <!-- banner -->
    <el-carousel trigger="click" height="15rem">
      <el-carousel-item v-for="item in 4" :key="item._id">

      </el-carousel-item>
    </el-carousel>
    <!-- 书本 -->
      <div class="book-container"  v-loading.fullscreen.lock="fullscreenLoading">
        <template v-for="item in list">
          <a v-bind:href="'#/contents/' + item._id" :key="item._id"><book :item="item"/></a>
        </template>
      </div>
  </div>
</template>
<script>
import CommonService from "@/service/common.js"
import book from "@/components/Book/Book"
export default {
  name: 'HomePage',
  data () {
    return {
      list: []
    }
  },
  components: {
    book
  },
  methods: {
    _getBooks: function () {
      let t = this
      this.fullscreenLoading = true
      CommonService.getBookList().then(res => {
        t.list = res.data.data.list
        this.fullscreenLoading = false
      })
    }
  },
  created: function () {
    this._getBooks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
<style scoped lang="css">
  @import url(./HomePage.css)
</style>