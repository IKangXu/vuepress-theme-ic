<template>
  <div class="footer">
    <a href="https://github.com/IKangXu/vuepress-theme-ic" target=_blank>
      <i class="item-icon iconfont iconzhuti1"></i>
      <span>VuePress-Theme-IC</span>
    </a>
    <a href="http://beian.miit.gov.cn/" target=_blank>
      <i class="item-icon iconfont iconbeian"></i>
      <span>苏ICP备19025415号</span>
    </a>
    <a href="https://github.com/IKangXu" target=_blank>
      <i class="item-icon iconfont iconcopyright"></i>
      <span>IKangXu 2020</span>
    </a>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.footer
    text-align center
    text-align center
    background-color #fff
    max-width 1000px
    min-width 200px
    padding .5rem 2rem
    margin 0 auto
    a
        color #a7a7a7
        margin-left 1rem
        font-size 14px
        cursor pointer
        &:hover
            color #736f6f
</style>
