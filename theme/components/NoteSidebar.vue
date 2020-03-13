<template>
  <div class="note-sidebar" v-if="open">
    <!-- 触发条件 -->
    <i class="item-icon iconfont iconcaidan" @click="showSidebar"></i>
    <!-- 目录 -->
    <div class="sidebar-container" v-if="sidebar.show">
      <h3>目录</h3>
      <a
        v-for="(item, index) in sidebarList"
        :href="'#' + item.slug"
        :title="item.title"
        :slug="item.slug"
        :class="[
          'sidebar-anchor',
          'level-' + item.level,
          item.slug === hash ? 'actived' : ''
        ]"
        @click="changeStatus"
        >{{ item.title }}</a
      >
    </div>
  </div>
</template>
<script>
import Bus from "../util/bus.js";
export default {
  name: "NoteSidebar",
  data() {
    return {
      sidebar: {
        show: false,
        scrollHash: undefined
      }
    };
  },
  mounted() {
    let vm = this;
    // 初始加载的时候  恢复颜色选中状态
    Bus.$on("scrollHash", scrollHash => {
      vm.selectedScrollHash(scrollHash);
      vm.sidebar.scrollHash = scrollHash;
    });
  },
  computed: {
    open() {
      let sidebar = this.$page.frontmatter.sidebar;
      if (!sidebar) {
        return false;
      }
      if (sidebar === "auto" || sidebar == true) {
        return true;
      }
      return false;
    },
    sidebarList() {
      return this.$page.headers;
    },
    hash() {
      return decodeURIComponent(this.$route.hash.slice(1));
    }
  },
  methods: {
    showSidebar() {
      if (this.sidebar.show) {
        this.sidebar.show = false;
      } else {
        this.sidebar.show = true;
        this.$nextTick(() => {
          if (this.sidebar.scrollHash) {
            this.selectedScrollHash(this.sidebar.scrollHash);
          }
        });
      }
    },
    changeStatus() {
      let childElements = event.currentTarget.parentElement.children;
      Array.prototype.slice.call(childElements).forEach(element => {
        let eClass = element.getAttribute("class");
        if (
          eClass &&
          eClass.search("sidebar-anchor") != -1 &&
          eClass.search("actived") != -1
        ) {
          element.setAttribute("class", eClass.replace("actived", ""));
        }
      });
      event.currentTarget.setAttribute(
        "class",
        event.currentTarget.getAttribute("class").concat(" actived")
      );
    },
    selectedScrollHash(scrollHash) {
      if (!document.querySelector(".sidebar-container")) {
        return;
      }
      let childElements = document.querySelector(".sidebar-container").children,
        currentElement = undefined;
      Array.prototype.slice.call(childElements).forEach(element => {
        let eClass = element.getAttribute("class");
        if (
          eClass &&
          eClass.search("sidebar-anchor") != -1 &&
          eClass.search("actived") != -1
        ) {
          element.setAttribute("class", eClass.replace("actived", ""));
        }
        if (element.getAttribute("slug") === scrollHash) {
          currentElement = element;
        }
      });
      if (currentElement && scrollHash) {
        currentElement.setAttribute(
          "class",
          currentElement.getAttribute("class").concat(" actived")
        );
      }
    }
  }
};
</script>
<style lang="stylus">
.note-sidebar
    .item-icon
        position fixed
        z-index 4
        right 1rem
        top 4rem
        color #ffffff
        background-color #000000
        padding .5rem
        font-size 1.7rem
        cursor pointer
    .sidebar-container
        position fixed
        z-index 4
        width 10rem
        right 0
        top 7rem
        padding .5rem 1rem
        background-color rgba(0,0,0,.7)
        h3
            color #ffffff
        .sidebar-anchor
            display block
            line-height 1.7rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            color #ffffff
            &.level-3
                margin-left 2rem
            &.actived
                color #3eaf7c
</style>
