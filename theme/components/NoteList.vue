<template>
  <div class="note-list">
    <!--  -->
    <ul>
      <li
        :class="['note', item.path === currentNote.path ? 'actived' : '']"
        v-for="(item, i) in notes"
        @click="changeStatus"
      >
        <RouterLink :to="item.regularPath">
          <div class="title">
            <!-- <i class="item-icon iconfont icondayuhao"></i> -->
            <span>{{ item.frontmatter.title }}</span>
          </div>
          <br />
          <!-- 摘要 -->
          <span class="abstract" v-html="item.excerpt"></span>
          <!-- 时间，标签，分类等 -->
          <div class="copyright" v-if="item.frontmatter.reprint">
            <span>转载</span>
          </div>
          <div class="copyright" v-else="item.frontmatter.reprint">
            <span>原创</span>
          </div>
          <div class="author" v-if="author(item)">
            <i class="item-icon iconfont iconmian-renwu">
              &nbsp;<span>{{ item | getAuthor($themeConfig.author) }} </span>
            </i>
          </div>
          <div class="category" v-if="item.frontmatter.categories">
            <i class="item-icon iconfont iconCategoriesCopy">
              &nbsp;<span v-for="(category, ci) in item.frontmatter.categories"
                >{{ category }}
              </span>
            </i>
          </div>
          <div class="tags" v-if="item.frontmatter.tag">
            <i class="item-icon iconfont icontag">
              &nbsp;<span v-for="(tag, ti) in item.frontmatter.tag"
                >{{ tag }}
              </span>
            </i>
          </div>
          <div class="time" v-if="item.frontmatter.time">
            <i class="item-icon iconfont icontime">
              &nbsp;<span>{{ item.frontmatter.time | formatTime }}</span>
            </i>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script>
import { utcToTime, changeStyle, changeShowStatus } from "../util/util.js";

export default {
  name: "NoteList",
  data() {
    return {};
  },
  props: {
    notes: Array,
    screenWidth: Number
  },
  computed: {
    currentNote() {
      return this.$page;
    }
  },
  filters: {
    formatTime: function(value) {
      return utcToTime(value);
    },
    getAuthor: function(value, defaultValue) {
      if (value.frontmatter.reprint) {
        return value.frontmatter.reprint.author;
      }
      return defaultValue;
    }
  },
  mounted() {
    changeStyle(document.body.clientWidth);
    changeShowStatus(document.body.clientWidth);
  },
  methods: {
    author(item) {
      if (item.frontmatter.reprint) {
        return item.frontmatter.reprint.author;
      }
      return this.$themeConfig.author;
    },
    changeStatus() {
      let childElements = event.currentTarget.parentElement.children;
      Array.prototype.slice.call(childElements).forEach(element => {
        let eClass = element.getAttribute("class");
        if (
          eClass &&
          eClass.search("note") != -1 &&
          eClass.search("actived") != -1
        ) {
          element.setAttribute("class", eClass.replace("actived", ""));
        }
      });
      event.currentTarget.setAttribute(
        "class",
        event.currentTarget.getAttribute("class").concat(" actived")
      );

      changeShowStatus(document.body.clientWidth);
    }
  }
};
</script>
<style src="../styles/note.styl" lang="stylus"></style>
<style lang="stylus">
.note-list_hide
  display none !important
.note-list_1200
    position fixed !important
    left 160px
    top 0
    z-index 10 !important
.note-list_510
    width calc(100% - 160px) !important
    overflow-x hidden !important
.note-list
  height 100%
  display inline-block
  float left
  width 350px
  overflow auto
  border-right 1px solid #E0E1E5
  background-color #ffffff
  box-shadow 2px 0 6px rgba(0,21,41,.15)
  -webkit-box-shadow 2px 0 6px rgba(0,21,41,.15)
  position relative
  ul
    padding 0
  .note
    padding .5rem 1rem
    border-bottom 1px solid #E0E1E5
    margin-bottom .5rem
    box-shadow 2px 0 6px rgba(0,21,41,.15)
    -webkit-box-shadow 2px 0 6px rgba(0,21,41,.15)
    cursor pointer
    &.actived
        transition border-left .5s
        border-left .5rem solid #42b983
    &:hover
        background-color #F2F2F2
    img
        max-width 20rem
    .title
        display inline-block
        color #000000
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 100%
    .copyright
        background #f2f2f2
        color rgba(0,0,0,0.3)
        display inline-block
        vertical-align text-bottom
        padding 0 .5em
        font-size 12px
        line-height 1.67
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        word-wrap normal
    .abstract
        font-size .8rem
        color #9E9E9E
        > :first-child
            margin 0
        li 
          margin-left 1rem
    .tags
        color #9E9E9E
        display inline-block
        font-size .5rem
        .iconfont
          font-size .8rem
    .category,.author
        color #9E9E9E
        display inline-block
        font-size .5rem
        .iconfont
          font-size .8rem
    .time
        display inline-block
        font-size .5rem
        color #9E9E9E
        .iconfont
          font-size .8rem
</style>
