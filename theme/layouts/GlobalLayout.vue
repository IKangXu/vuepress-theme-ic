<template>
  <div id="global-layout">
    <!-- 头部 -->
    <Head :screenWidth="screenWidth" />
    <!-- 列表页 -->
    <NoteList
      :screenWidth="screenWidth"
      v-show="notes && notes.length > 0"
      :notes="notes"
    />
    <!-- 内容页 -->
    <div
      :class="[parentCls]"
      @scroll="scroll"
      :style="{ 'background-image': `url(` + $themeConfig.noteConfig.bg + `)` }"
    >
      <div class="note-container">
        <DefaultGlobalLayout v-if="!$page.frontmatter.home" />
        <Home v-if="$page.frontmatter.home" />
        <Sponsor />
        <div class="valine-ic-comment">
          <Comment />
        </div>
      </div>
      <Footer />
      <WavesArea />
      <BrowseProgress :scrollCls="parentCls" />
    </div>
    <NavBtn :screenWidth="screenWidth"></NavBtn>
    <BackTop v-if="backTop.show" :parentCls="parentCls"></BackTop>
  </div>
</template>
<script>
import GlobalLayout from "@app/components/GlobalLayout.vue";
import Head from "@theme/components/Head.vue";
import NoteList from "@theme/components/NoteList.vue";
import NavBtn from "@theme/components/NavBtn.vue";
import BackTop from "@theme/components/BackTop.vue";
import Footer from "@theme/components/Footer.vue";
import Comment from "@theme/components/Comment.vue";
import Home from "@theme/components/Home.vue";
import Sponsor from "@theme/components/Sponsor.vue";
import WavesArea from "@theme/components/WavesArea.vue";
import BrowseProgress from "@theme/components/BrowseProgress.vue";

import { getGlobalInfo } from "@app/util";

import Bus from "../util/bus.js";
import { changeStyle } from "../util/util.js";

export default {
  data() {
    return {
      notes: [],
      screenWidth: 0,
      scrollHash: null,
      parentCls: "note-content",
      loading: {
        show: true
      },
      backTop: {
        show: false
      }
    };
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let vm = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          // console.log(vm.screenWidth);
          vm.timer = false;
        }, 400);
      }
    }
  },
  beforeMount() {
    document
      .querySelector(".loading-header")
      .setAttribute("src", this.$withBase(this.$site.themeConfig.logo));
  },
  mounted() {
    // debugger
    // 获取当前访问的path  vm.$router.app._route.path 如果path存在于sessionStorage中，则正常访问
    // 需要制定一套规则，来展开左侧菜单并定位至此，并且notes需要动态赋值
    let vm = this;
    setTimeout(function() {
      // let flag = true,
      //   cnt = 0;
      // while (flag) {
      //   if (cnt > 10000) {
      //     flag = false;
      //   }

      //   console.log(cnt);
      //   cnt++;
      // }

      let currentPath = vm.$router.app._route.path;
      // 如果当前路由时根路径，则清空notes集合
      if (currentPath === "/") {
        sessionStorage.removeItem("notes");
      }
      // 如果当前新开的一个窗口且sessionStorage中notes为空，那么手动构造notes
      if (currentPath !== "/") {
        let navs = vm.$themeConfig.navs,
          showFlag = true;
        for (let i = 0; i < navs.length; i++) {
          if (
            vm.$page.regularPath &&
            navs[i].link ===
              decodeURIComponent(
                vm.$page.regularPath.substring(
                  0,
                  vm.$page.regularPath.lastIndexOf(".")
                )
              )
          ) {
            showFlag = false;
            break;
          }
        }
        if (!showFlag || !vm.$page.regularPath) {
          sessionStorage.removeItem("notes");
        } else {
          sessionStorage.setItem("notes", JSON.stringify([vm.$page]));
        }
      }

      let sessionNotes = sessionStorage.getItem("notes");
      vm.notes = sessionStorage.getItem("notes")
        ? JSON.parse(sessionNotes)
        : [];
      // 用$on事件来接收参数

      Bus.$on("notes", notes => {
        vm.notes = notes;
      });

      // 监听页面大小变化
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          vm.screenWidth = window.screenWidth;
        })();
      };

      // this.loading.show = false;
      // 加载完成之后关闭Loading
      setTimeout(function() {
        let loadingContainer = document.querySelector(".loading-container");
        let loadingClass = loadingContainer.getAttribute("class");
        loadingContainer.setAttribute(
          "class",
          loadingClass.concat(" loading-fade-out")
        );
        loadingContainer.addEventListener("transitionend", function() {
          loadingContainer.style.display = "none";
        });
      }, 500);
    }, 500);
  },
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Head,
    NoteList,
    NavBtn,
    BackTop,
    Footer,
    Comment,
    Home,
    Sponsor,
    WavesArea,
    BrowseProgress
  },
  methods: {
    scroll() {
      let headers = this.$page.headers,
        vm = this,
        top = event.target.scrollTop,
        bodyHeight = document.body.offsetHeight,
        cnt = 0;
      if (top != 0) {
        vm.backTop.show = true;
      } else {
        vm.backTop.show = false;
      }
      if (!headers) {
        return;
      }
      for (let i = 0; i < headers.length; i++) {
        let header = headers[i];
        if (!document.getElementById(header.slug)) {
          continue;
        }
        let startTop = document.getElementById(header.slug).offsetTop;
        if (top > startTop || bodyHeight > startTop - top) {
          vm.scrollHash = header.slug;
          cnt++;
          if (top > startTop) {
            continue;
          }
          if (bodyHeight > startTop - top) {
            break;
          }
        }
      }
      if (cnt == 0) {
        vm.scrollHash = null;
      }
      Bus.$emit("scrollHash", vm.scrollHash);
    }
  }
};
</script>
<style lang="stylus">
#global-layout
  height 100%
  .note-content
    background-color #ffffff
    height 100%
    overflow auto
    overflow-x hidden
    // background-image url('/bg.jpg')
    .note-container
      max-width 1000px
      min-width 200px
      padding 1rem 2rem
      margin 0 auto
      box-shadow 0 0 6px 3px rgba(0,21,41,0.15)
      min-height calc(100vh - 3rem - 21px)
      background-color #ffffff
      // p,.custom-block.tip
      //   margin 0
    #valine-ic-comment
      background-color #fff
      max-width 1000px
      min-width 200px
      margin 0 auto
      margin-top 3rem
</style>
