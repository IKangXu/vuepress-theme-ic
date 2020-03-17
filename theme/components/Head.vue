<template>
  <div class="head">
    <RouterLink :to="$localePath" class="home-link" @click.native="homeClick">
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
      <br />
      <span v-if="$site.themeConfig.author" class="author-name">{{
        $site.themeConfig.author
      }}</span>
    </RouterLink>
    <div v-if="contact.enabled" class="contact">
      <a
        v-for="(item, index) in contact.items"
        :href="item.link"
        target="_blank"
      >
        <i
          v-if="item.icon"
          :class="[{ 'item-icon iconfont': item.icon }, item.icon]"
        ></i>
        <!-- {{ item.text }} -->
      </a>
    </div>
    <div class="note-nav">
      <ul class="note-nav-ul">
        <NoteNav :navItems="noteNav" :idx="idx" />
      </ul>
    </div>
    <BaseNav />
    <!-- <button @click="changeNoteList">改变noteList</button> -->
  </div>
</template>
<script>
import NoteNav from "@theme/components/NoteNav.vue";
import BaseNav from "@theme/components/BaseNav.vue";
import Bus from "../util/bus.js";
import { changeStyle, changeShowStatus } from "../util/util.js";
export default {
  name: "Head",
  data() {
    return {
      noteNavComponent: "noteNavCp",
      idx: 0
    };
  },
  props: {
    screenWidth: Number
  },
  watch: {
    screenWidth(val) {
      changeStyle(val);
      changeShowStatus(val);
    }
  },
  components: {
    NoteNav,
    BaseNav
  },
  computed: {
    // 获取底部设计
    footerNav() {
      return this.$themeConfig.nav;
    },
    // 获取菜单
    noteNav() {
      let nav = this.$themeConfig.noteConfig.nav,
        _this = this;
      // 构造对应的菜单，字段包含原始值，在原始值的基础上增加一个数量属性
      if (!nav) {
        return [];
      }
      this.buildNoteNav(null, nav);
      return nav;
    },
    // 联系我
    contact() {
      return this.$themeConfig.noteConfig.contact;
    }
  },
  mounted() {
    changeStyle(document.body.clientWidth);
    changeShowStatus(document.body.clientWidth);
  },
  methods: {
    // changeNoteList(pages) {
    //   this.$emit("changeNoteList", pages);
    // },
    buildNoteNav(frontmatterId, items) {
      let _this = this;
      let childCount = 0;
      items.forEach((item, index, arr) => {
        // item.count = 0; // 默认设置为0
        
        if (item.hasOwnProperty("items")) {
          // 属于组  只有item.frontmatter.id起用作用
          // let count = 0;
          // _this['$'+item.frontmatter.id].pages.forEach((val, idx) => {
          //     count += val.pages.length;
          // });
          // item.count = count;
          let fmId = item.frontmatter.id;
          if (!fmId) {
            fmId = frontmatterId;
          }
          // 需要递归循环
          _this.buildNoteNav(fmId, item.items);
          item.frontmatter.id = fmId;
          let vector = _this["$" + fmId];
          item.count = _this.recursiveCalc(item, fmId); // count ? count : 0; //vector ? vector.pages.length : 0; // 显示的分组内的个数
        } else {
          // 不属于组 item.frontmatter.key起作用，如果item.frontmatter.key是undefined，则忽视
          let vector =
            _this["$" + (frontmatterId ? frontmatterId : item.frontmatter.id)];
          item.count = vector ? (vector.map[item.frontmatter.key] ? vector.map[item.frontmatter.key].pages.length : 0) : 0;
          item.frontmatter.id = frontmatterId
            ? frontmatterId
            : item.frontmatter.id;
          childCount += item.count;
        }
      });
    },
    recursiveCalc(item, frontmatterId ) {
        let count = 0;
        let _this = this;
        if (item.hasOwnProperty("items")) {
          item.items.forEach((im, index, arr) => {
            let fmId = item.frontmatter.id;
            if (!fmId) {
              fmId = frontmatterId;
            }
            count += _this.recursiveCalc(im, fmId);
          })
          
        } else {
          let vector =
            _this["$" + (frontmatterId ? frontmatterId : item.frontmatter.id)];
          count = vector ? (vector.map[item.frontmatter.key] ? vector.map[item.frontmatter.key].pages.length : 0) : 0;
        }
        return count;
    },
    homeClick() {
      // 清空数据
      Bus.$emit("notes", []);
      sessionStorage.removeItem("notes");
    }
  }
};
</script>
<style src="../styles/note.styl" lang="stylus"></style>
<style lang="stylus">
.head_hide
  display none !important
.head_1200
    position fixed !important
    left 0
    top 0
    z-index 11 !important
.head
    width 160px
    height 100%
    margin 0
    float left
    color #ffffff
    background-color #000000
    text-align center
    position relative
    z-index 2
    box-shadow 2px 0 6px rgba(0,21,41,.35)
    a
      color #ffffff
    .logo
        height $navbarHeight
        min-width $navbarHeight
        vertical-align top
        border-radius 3.6rem
        margin-top 1rem
        margin-bottom .5rem
    .author-name,.logo
        cursor pointer
    .contact
        padding .5rem
        line-height 2rem
        .item-icon
            width 5px
            height 5px
            padding .1rem
    .note-nav
      text-align left
      cursor pointer
      height 70%
      overflow auto
      ul
        padding 0
        // padding-left .5rem
      >ul.note-nav-ul
        padding 0
        > div
          // > li
          //   border-bottom 1px solid #ffffff
          .item
            position relative
            line-height 2rem
            > a
              margin-left .5rem
              display inline-block
              width calc(100% - .5rem)
              height 100%
            .nav-child
              display none
            .nav-child.show
              display block
              // animation: unfold_top 0.3s ease-in-out;
          .item-group
            ul
              background-color: #3A3D49
              a
                font-size .85rem
            .nav-down
                width 0
                height 0
                border-left 1rem solid transparent
                border-right 1rem solid transparent
                border-top 1rem solid #0066cc
                overflow hidden
                cursor pointer
                transition all .2s
                -webkit-transition all .2s
                position absolute
                top .8rem
                right .5rem
                border-width 5px
                border-top-color rgba(255, 255, 255, .7)
            .nav-down-transform
                  transform: rotate(180deg);
          .item-singleton
            &:hover
              background-color #f2f2f2
              background-size 100% 1rem
              a
                color #000000
        li
          // padding-left 0.5rem
          ul
            // background-color #3A3D49
            // margin-left -.5rem
@keyframes unfold_top {
    0% {
        transform-origin: top;
        height: 0;
        transform: perspective(100px) rotateX(0deg);
    }
    100% {
        transform: perspective(100px) rotateX(0deg);
        height: 80px;
    }
}
</style>
