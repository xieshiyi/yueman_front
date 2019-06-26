<template>
    <div class="book" :style="{marginRight: (index+1) % 3 === 0 ? '0': '1.2rem'}">
      <img v-lazy="item.cover_image" class="book_image" />
      <span class="tit">{{item.name}}</span>
      <p class="tags">
        <span v-for="(tag, index) in item.tags" :key="index">{{tag}}</span>
      </p>
    </div>
</template>
<script>
export default {
  props: {
    index: Number,
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