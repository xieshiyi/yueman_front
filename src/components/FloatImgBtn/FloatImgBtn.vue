
<template>
  <div class="xbmc-home-btn xbmc-drag-area" @touchmove.stop="viewTouchMove" @click='handleClick' :style="{ 'width':itemWidth+'px','height':itemHeight+'px', right: right + 'px', bottom: bottom + 'px' }">
    <!-- <i class="iconfont" :class="[ icon ]"></i> -->
  </div>
</template>

<script>
/**
 * // 获取微信窗口高度
 * @return number 单位 px
 */
export function getWindowHeight() {
  try {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    return { windowWidth, windowHeight }
  } catch (e) {
    return 1196
  }
}
export default {
  name: 'FloatImgBtn',
  props: {
    itemWidth:{
      type:Number,
      default:60
    },
    itemHeight:{
      type:Number,
      default:60
    },
    right: {
      type: Number,
      default: 15
    },
    bottom: {
      type: Number,
      default: 50
    },
    icon: {
      type: String,
      // default: 'icon-add'
    }
  },
  data() {
    return {
      windowWidth: 0, // 视口宽度
      windowHeight: 0 // 视口高度
    }
  },
  onReady() {
    // 获取view层视口
    let { windowWidth, windowHeight } = getWindowHeight()
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
  },
  methods: {
    viewTouchMove(e) {
      let eventX = this.windowWidth - e.mp.touches[0].clientX - 38 / 2
      let eventY = this.windowHeight - e.mp.touches[0].clientY - 38 / 2
      this.right =
        eventX < 0
          ? 0
          : eventX > this.windowWidth - 38 ? this.windowWidth - 38 : eventX
      this.bottom =
        eventY < 0
          ? 0
          : eventY > this.windowHeight - 38 ? this.windowHeight - 38 : eventY
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="css" scoped>
.xbmc-home-btn {
   position: fixed;
  border-radius: 50%;
  background: #60AAFF;
  box-shadow: 0px 0px 10px 0px #60AAFF;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>

