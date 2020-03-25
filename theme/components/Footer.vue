<template>
  <div class="footer">
    <a href="https://github.com/IKangXu/vuepress-theme-ic" target="_blank">
      <i class="item-icon iconfont iconzhuti1"></i>
      <span>VuePress-Theme-IC</span>
    </a>
    <a v-if="footer.icp.val" :href="footer.icp.link" target="_blank">
      <i class="item-icon iconfont iconbeian"></i>
      <span>{{ footer.icp.val }}</span>
    </a>
    <a href="javascript: void(0);" target="_blank">
      <i class="item-icon iconfont iconcopyright"></i>
      <span v-if="footer.startYear"
        >{{ author }} {{ footer.startYear }} - {{ currentYear }}</span
      >
      <span v-else>{{ author }} {{ currentYear }}</span>
    </a>

    <p v-if="footer.psr.val" class="psr">
      <img
        src="https://gw.alicdn.com/tfs/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20.png"
      />
      <a :href="footer.psr.link" target="_blank">{{ footer.psr.val }}</a>
    </p>
  </div>
</template>
<script>
import * as moment from "moment";
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    footer() {
      return this.$themeConfig.footer;
    },
    currentYear() {
      return moment().format("YYYY");
    },
    author() {
      return this.$themeConfig.author;
    }
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
    .psr
       img 
          vertical-align middle
        a
          vertical-align middle
          margin 0
</style>
