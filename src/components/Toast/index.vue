<template>
<transition name="fade">
  <div class="mask comp-toast" v-if="isShow">
    <div class="container">
      <div class="tip-modal">
        <div class="txt">{{text}}</div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    text: String,
    isShow: Boolean,
  },
  methods: {
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.mask .container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.mask .container .tip-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(58, 58, 58, 0.9);
  border-radius: 0.4rem;
  z-index: 100;
}
.titletips {
  font-size: 1.4rem;
  text-align: center;
  padding: 0.52rem 0 0 0;
}
.txt {
  width: 8rem;
  font-size: 1.4rem;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
}
</style>
