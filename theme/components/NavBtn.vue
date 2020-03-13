<template>
  <div class="nav-btn">
    <i class="item-icon iconfont icondaohang" @click="show()"></i>
  </div>
</template>
<script>
import { changeShowStatus } from "../util/util.js";

export default {
  name: "NavBtn",
  data() {
    return {
      showStatus: true
    };
  },
  props: {
    screenWidth: Number
  },
  methods: {
    show() {
      let headElement = document.getElementsByClassName("head")[0];
      let headClass = headElement.getAttribute("class");
      if (headClass.search("head_hide") == -1) {
        headElement.setAttribute("class", headClass.concat(" head_hide"));
        let noteListElement = document.getElementsByClassName("note-list")[0];
        if (noteListElement) {
          let noteListClass = noteListElement.getAttribute("class");
          if (noteListClass.search("note-list_hide") == -1) {
            noteListElement.setAttribute(
              "class",
              noteListClass.concat(" note-list_hide")
            );
          }
        }
        return;
      }
      if (headClass.search("head_hide") != -1) {
        headElement.setAttribute("class", headClass.replace("head_hide", ""));
        let noteListElement = document.getElementsByClassName("note-list")[0];
        if (noteListElement) {
          let noteListClass = noteListElement.getAttribute("class");
          if (noteListClass.search("note-list_hide") != -1) {
            noteListElement.setAttribute(
              "class",
              noteListClass.replace("note-list_hide", "")
            );
          }
        }
      }
    }
  }
};
</script>
<style lang="stylus">
.nav-btn
    .item-icon
        position fixed
        z-index 12
        right 1rem
        top 1rem
        color #ffffff
        background-color #000000
        padding .5rem
        font-size 1.7rem
        cursor pointer
</style>
