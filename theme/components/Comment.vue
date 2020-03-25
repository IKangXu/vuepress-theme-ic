<template>
  <div></div>
</template>

<script>
import ejs from 'ejs'
const commentDomID = "vuepress-plugin-comment";
let timer = null;
let Gitalk, Valine;

export default {
  name: "Comment",
  computed: {
    commentConfig() {
      return this.$themeConfig.comment;
    }
  },
  beforeMount() {
    if (this.commentConfig.choosen === "valine") {
      import("valine").then(pkg => (Valine = pkg.default));
    } else if (this.commentConfig.choosen === "gitalk") {
      import("gitalk/dist/gitalk.css")
        .then(() => import("gitalk"))
        .then(pkg => (Gitalk = pkg.default));
    }
  },
  mounted() {
    let _this = this;
    timer = setTimeout(() => {
      const frontmatter = {
        to: {},
        from: {},
        ...this.$frontmatter
      };
      _this.clear() && _this.needComment(frontmatter) && _this.renderComment(frontmatter);
    }, 1000);

    _this.$router.afterEach((to, from) => {
      if (to && from && to.path === from.path) {
        return;
      }
      const frontmatter = {
        to,
        from,
        ...this.$frontmatter
      };
      _this.clear() && _this.needComment(frontmatter) && _this.renderComment(frontmatter);
    });
  },
  methods: {
    clear(frontmatter) {
      switch (this.commentConfig.choosen) {
        case "gitalk":
          return provider.gitalk.clear(commentDomID);
        case "valine":
          let el = this.commentConfig.options.el || commentDomID;
          if (el.startsWith("#")) {
            el = el.slice(1);
          }
          return provider.valine.clear(el);
        default:
          return false;
      }
    },
    needComment(frontmatter) {
      return frontmatter.comment !== false && frontmatter.comments !== false;
    },
    renderComment(frontmatter) {
      clearTimeout(timer);

      const parentDOM = document.querySelector(this.commentConfig.container);
      if (!parentDOM) {
        timer = setTimeout(() => renderComment(frontmatter), 200);
        return;
      }

      switch (this.commentConfig.choosen) {
        case "gitalk":
          return provider.gitalk.render(frontmatter, commentDomID, this.commentConfig.options, this.commentConfig.container);
        case "valine":
          let el = this.commentConfig.options.el || commentDomID;
          if (el.startsWith("#")) {
            el = el.slice(1);
          }
          return provider.valine.render(frontmatter, el, this.commentConfig.options, this.commentConfig.container);
        default:
          return false;
      }
    }
  }
};
function renderConfig (config, data) {
  const result = {}

  Reflect.ownKeys(config)
    .forEach(key => {
      if (typeof config[key] === 'string') {
        try {
          result[key] = ejs.render(config[key], data)
        } catch (error) {
          console.warn(`Comment config option error at key named "${key}"`)
          console.warn(`More info: ${error.message}`)
          result[key] = config[key]
        }
      } else {
        result[key] = config[key]
      }
    })
  
  return result
}
const provider = {
  gitalk: {
    render (frontmatter, commentDomID, options, container) {
      const commentDOM = document.createElement('div')
      commentDOM.id = commentDomID

      const parentDOM = document.querySelector(container)
      parentDOM.appendChild(commentDOM)
      
      const gittalk = new Gitalk(renderConfig(options, { frontmatter }))
      gittalk.render(commentDomID)
    },
    clear (commentDomID) {
      const last = document.querySelector(`#${commentDomID}`)
      if (last) {
        last.remove()
      }
      return true
    }
  },
  valine: {
    render (frontmatter, commentDomID, options, container) {
      const commentDOM = document.createElement('div')
      commentDOM.id = commentDomID

      const parentDOM = document.querySelector(container)
      parentDOM.appendChild(commentDOM)

      new Valine({
        ...options,
        path: frontmatter.to.path,
        el: `#${commentDomID}`
      })
    },
    clear (commentDomID) {
      const last = document.querySelector(`#${commentDomID}`)
      if (last) {
        last.remove()
      }
      return true
    }
  },
  vssue: {}
}
</script>
<style lang="stylus">
#valine-ic-comment.v
    .veditor
      border: 1px dashed #dedede
    .vbtn
      color: #2c3e50
      border: 1px solid #eaecef
      border-radius: 0
      &:hover
        color: $accentColor
        border-color: $accentColor
    .vwrap
      border-radius: 0
      background: rgba(27, 31, 35, 0.05)
      border: 1px dashed #eaecef
      .vcontrol .vsubmit
        background: rgba(27, 31, 35, 0.05)
      .vheader 
        .vinput
          border: 1px dashed #dedede
    .vinfo
      padding-left: .6rem
    .vlist
      padding: 0 .6rem
      border-radius: .25rem
      .vcard
        .vquote
          margin-left: 0
          border-left: 1px dashed #eaecef
        .vimg
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 0
          border: none
        .vhead
          border-radius: 0
      .vh
        border-bottom: none
        .vhead .vsys
          color: $accentColor
          background: rgba(27, 31, 35, 0.05)
        .vmeta
          margin-bottom: 1rem
          .vat
            margin-right: .3rem
            color: #2c3e50
            background: rgba(27, 31, 35, 0.05)
            border-radius: 0
            padding: 0 .4rem
            border: 1px solid #eaecef
            &:hover
              color: $accentColor
              border-color: $accentColor
        .vcontent
          background: rgba(27, 31, 35, 0.05)
          border-radius: 0
          margin: 0 .3rem
          padding: .1rem .6rem .05rem .6rem
          p .at
            color: #1abc9c
          &.expand:before
            z-index 1
            background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff)
          &.expand:after
            color: $accentColor
            background: #fff
    .info
      padding-right: .6rem
</style>

