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
          console.log(el);
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
