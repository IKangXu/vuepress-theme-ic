<template>
  <div class="browse-progress top">
    <div :style="progressStyle" class="progress"></div>
  </div>
</template>

<script>
export default {
  name: "BrowseProgress",
  data() {
    return {
      progressStyle: null
    };
  },
  props: {
    scrollCls: String
  },
  mounted() {
    this.changeProgressStyle();
    document
      .getElementsByClassName(this.scrollCls)[0]
      .addEventListener("scroll", this.changeProgressStyle, 200);
  },
  methods: {
    changeProgressStyle() {
      let browseHeight =
        (document.getElementsByClassName(this.scrollCls)[0].scrollHeight || 0) -
        (window.innerHeight ||
          document.getElementsByClassName(this.scrollCls)[0].clientHeight ||
          0);
      let browseTop =
        document.getElementsByClassName(this.scrollCls)[0].scrollTop || 0;

      let progress = browseTop / browseHeight;
      if (!progress) {
        progress = 0;
      }
      this.progressStyle = `transform: scaleX(${progress});width: 100%`;
    }
  }
};
</script>

<style lang="stylus" scoped>

.browse-progress
  position fixed
  z-index 1000
  background transparent
  overflow hidden
  .progress
    width 0%
    height 100%
    background $accentColor
    background-image none
    transform-origin 0% 0%
    transition: transform .2s ease-out
&.top
  top 0
  left 0
  right 0
  width 100%
  height 3px
</style>
