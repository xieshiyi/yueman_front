<template>
    <!-- 心愿列表 -->
    <div class="dream_item">
      <img v-lazy="item.cover_image" class="dream_image" />
      <span class="tit">{{item.name}}</span>
      <el-button class="delete_button">删除心愿</el-button>
    </div>
</template>
<script>
export default {
  props: {
    item: {
      _id: String,
      name: String,
      tags: Array,
      reward_num: Number,
      cover_image: String,
      desc: String,
      create_time: Number
    }
  }
}
</script>
<style scoped lang="css">
@import url(./DreamItem.css);
</style>