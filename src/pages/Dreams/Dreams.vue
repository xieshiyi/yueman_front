<template>
   <div class="dream-container"  v-loading.fullscreen.lock="fullscreenLoading">
     <!-- 头部控制 -->
    <div class="menu-bar">
      <div class="back Js_btn_goback" v-on:click="goback" data-href>返回</div>
      <div class="tit">我的心愿单</div>
    </div>
    <!-- 心愿列表 -->
    <div class="dream_list_container">
      <template v-for="item in list">
        <DreamItem :item="item" :key="item._id" />
      </template>
    </div>
    <!-- 添加心愿按钮 -->
    <div class="add_dream">
      <el-button class="add_dream_btn" @click="dialogVisible = true">添加心愿</el-button>
    </div>
    <!-- 填写心愿表单弹窗 -->
    <el-dialog
      title="新心愿"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose" custom-class="dream_form">
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          placeholder="请输入内容"
          v-model="input10"
          clearable>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CommonService from "@/service/common.js"
import DreamItem from "@/components/DreamItem/DreamItem"
export default {
  name: 'Dreams',
  data () {
    return {
      list: [],
       dialogVisible: false
    }
  },
  components: {
      DreamItem
  },
  methods: {
    _getDreams: function () {
      let t = this
      this.fullscreenLoading = true
      CommonService.getBookList().then(res => {
        t.list = res.data.data.list
        this.fullscreenLoading = false
      })
    },
    goback: function() {
        this.$router.go(-1)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created: function () {
      this._getDreams()
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
</style>
<style scoped lang="css">
  @import url(./Dreams.css)
</style>