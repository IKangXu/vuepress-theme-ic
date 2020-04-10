<template>
  <div>
    <div class="note-info" v-if="currentNote.title !== 'Home'">
      <h2>{{ currentNote.title }}</h2>
      <!-- 时间，标签，分类等 -->
      <div class="copyright" v-if="currentNote.frontmatter.reprint">
        <span>转载</span>
      </div>
      <div class="copyright" v-else="currentNote.frontmatter.reprint">
        <span>原创</span>
      </div>
      <div class="author" v-if="author">
        <i class="item-icon iconfont iconmian-renwu">
          &nbsp;<span>{{ author }} </span>
        </i>
      </div>
      <div class="category" v-if="currentNote.frontmatter.categories">
        <i class="item-icon iconfont iconCategoriesCopy">
          &nbsp;<span
            v-for="(category, ci) in currentNote.frontmatter.categories"
            >{{ category }}
          </span>
        </i>
      </div>
      <div class="tags" v-if="currentNote.frontmatter.tag">
        <i class="item-icon iconfont icontag">
          &nbsp;<span v-for="(tag, ti) in currentNote.frontmatter.tag"
            >{{ tag }}
          </span>
        </i>
      </div>
      <div class="time" v-if="currentNote.frontmatter.time">
        <i class="item-icon iconfont icontime">
          &nbsp;<span>{{ currentNote.frontmatter.time | formatTime }}</span>
        </i>
      </div>

      <!-- <div class="eye">
        <i class="item-icon iconfont iconai-eye"></i>
        <span :id="currentNote.path" class="leancloud_visitors" :data-flag-title="currentNote.title">
            <i class="leancloud-visitors-count"></i>
        </span>
      </div> -->
    </div>
    <!-- 内容导航 -->
    <NoteSidebar />
    <!-- 内容 -->
    <Content />
  </div>
</template>
<script>
import NoteSidebar from "@theme/components/NoteSidebar.vue";
import { utcToTime } from "../util/util.js";
export default {
  name: "NotePage",
  data() {
    return {
      readCount: true
    };
  },
  components: {
    NoteSidebar
  },
  computed: {
    currentNote() {
      return this.$page;
    },
    author() {
      if (this.currentNote.frontmatter.reprint) {
        return this.currentNote.frontmatter.reprint.author;
      }
      return this.$themeConfig.author;
    }
  },
  filters: {
    formatTime: function(value) {
      return utcToTime(value);
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.note-info
  white-space normal
  word-break break-all
  word-wrap break-word
  margin-bottom 1rem
  h2
    margin-bottom 1rem
    margin-top 0
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
  .copyright
      background #f2f2f2
      color rgba(0,0,0,0.3)
      display inline-block
      vertical-align bottom
      padding 0 .5em
      font-size 12px
      line-height 1.67
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-wrap normal
  .time
      display inline-block
      font-size .5rem
      color #9E9E9E
      .iconfont
        font-size .8rem
  .eye
      color #9E9E9E
      display inline-block
      font-size .5rem
      margin-left .1rem
      .iconfont
        font-size .8rem
      .leancloud_visitors
        margin-left .3rem
</style>
