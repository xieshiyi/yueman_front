<template>
    <div class="book">
      <img v-lazy="item.cover_image" class="book_image" />
      <span class="tit">{{item.name}}</span>
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
@import url(./Book.css);
</style>