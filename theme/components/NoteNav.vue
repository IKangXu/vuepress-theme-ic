<template>
  <div :class="['note-nav-container' + idx]">
    <li
      v-for="(item, index) in navItems"
      :class="[
        'item',
        navItems[index].items != undefined && navItems[index].items != null
          ? 'item-group'
          : 'item-singleton',
        navItems[index].open ? 'itemed' : ''
      ]"
    >
      <a v-if="item.items" href="javascript:void(0);" @click="navDown(false)">
        <i
          v-if="item.icon != null"
          :class="[{ 'item-icon iconfont': item.icon }, item.icon]"
        ></i>
        <span>{{ item.text }} | ({{ item.count }})</span>
      </a>
      <a v-else @click="changeNoteList(item)">
        <i
          v-if="item.icon != null"
          :class="[{ 'item-icon iconfont': item.icon }, item.icon]"
        ></i>
        <span>{{ item.text }} | ({{ item.count }})</span>
      </a>
      <ul
        v-if="item.items"
        :class="['nav-child', navItems[index].open ? 'show' : '']"
      >
        <NoteNav :navItems="item.items" :idx="idxChild"></NoteNav>
      </ul>
      <span
        v-if="item.items"
        :class="['nav-down', navItems[index].open ? 'nav-down-transform' : '']"
        @click="navDown(true)"
      ></span>
    </li>
  </div>
</template>
<script>
import Bus from "../util/bus.js";
import { changeStyle, changeShowStatus } from "../util/util.js";
export default {
  name: "NoteNav",
  data() {
    return {
      idxChild: 1
    };
  },
  props: {
    navItems: {},
    idx: Number
  },
  watch: {
    navItems: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true
    }
  },
  methods: {
    oClick() {
      console.log(2222);
    },
    changeNoteList(item) {
      let _this = this;
      let notes = _this["$" + item.frontmatter.id].map[item.frontmatter.key];
      let pages = notes.pages;

      Bus.$emit("notes", pages);
      // 将数据备份到sessionStorage中
      sessionStorage.setItem("notes", JSON.stringify(pages));

      changeStyle(document.body.clientWidth);
    },
    siblings(elm) {
      let a = []; //保存所有兄弟节点
      let p = elm.parentNode.children; //获取父级的所有子节点
      for (let i = 0; i < p.length; i++) {
        //循环
        if (p[i].nodeType == 1 && p[i] != elm) {
          //如果该节点是元素节点与不是这个节点本身
          a.push(p[i]); // 添加到兄弟节点里
        }
      }

      return a;
    },
    // 由于当前组件是递归方式，使用vue本身的特性来控制样式比较复杂，所以采用原生的Js方式进行样式控制
    navDown(isDown) {
      let currentElement;
      if (isDown) {
        currentElement = event.currentTarget;
      } else {
        let ss = this.siblings(event.currentTarget);
        for (let i = 0; i < ss.length; i++) {
          let cls = ss[i].getAttribute("class");
          if (cls.search("nav-down") != -1) {
            currentElement = ss[i];
            break;
          }
        }
      }
      if (!currentElement) {
        return;
      }
      let currentClass = currentElement.getAttribute("class");
      if (currentClass.search("nav-down-transform") == -1) {
        currentElement.setAttribute(
          "class",
          currentClass.concat(" nav-down-transform")
        );
      } else {
        currentElement.setAttribute(
          "class",
          currentClass.replace("nav-down-transform", "")
        );
      }
      // 给父级元素添加选中标识
      let parentElement = currentElement.parentElement;
      let parentClass = parentElement.getAttribute("class");
      if (parentClass.search("itemed") == -1) {
        parentElement.setAttribute("class", parentClass.concat(" itemed"));

        // 展开子元素
        let previousElement = currentElement.previousElementSibling;
        let previousClass = previousElement.getAttribute("class");
        if (previousClass.search("nav-child") != -1) {
          previousElement.setAttribute("class", previousClass.concat(" show"));
        }
      } else {
        parentElement.setAttribute("class", parentClass.replace("itemed", ""));

        // 隐藏子元素
        let previousElement = currentElement.previousElementSibling;
        let previousClass = previousElement.getAttribute("class");
        if (previousClass.search("nav-child") != -1) {
          previousElement.setAttribute(
            "class",
            previousClass.replace("show", "")
          );
        }
      }
    }
  }
};
</script>
<style lang="stylus">
.note-nav-container1
  border-top 1px solid #000
</style>
