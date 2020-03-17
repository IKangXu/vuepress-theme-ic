<template>
  <div class="base-nav">
    <div class="nav">
      <div
        v-for="(nav, index) in navs"
        :class="[index === navs.length - 1 ? 'clear-last-right-border' : '']"
      >
        <RouterLink :to="nav.link" v-if="!nav.blank" @click.native="navClick">{{
          nav.text
        }}</RouterLink>
        <a v-else :href="nav.link" target="_blank" rel="noopener noreferrer">
          {{ nav.text }}
        </a>
      </div>
      <!-- <div>友链</div> -->
      <!-- <div <div class="clear-last-right-border">RSS</div> -->
    </div>
  </div>
</template>
<script>
import Bus from "../util/bus.js";
import { changeShowStatus } from "../util/util.js";

export default {
  name: "BaseNav",
  data() {
    return {};
  },
  computed: {
    navs() {
      return this.$themeConfig.navs;
    }
  },
  methods: {
    navClick() {
      // 清空数据
      Bus.$emit("notes", []);
      sessionStorage.removeItem("notes");

      changeShowStatus(document.body.clientWidth);
    }
  }
};
</script>
<style lang="stylus" scoped>
.base-nav
    position absolute
    bottom 0
    width 100%
    line-height 2rem
    .nav
       display flex
       div
        flex 1
        border-top 1px solid #ffffff
        border-right 1px solid #ffffff
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        &.clear-last-right-border
            border-right 0
</style>
