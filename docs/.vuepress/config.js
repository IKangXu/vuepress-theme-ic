module.exports = {
  // 博客名
  title: "Hello VuePress",
  // 博客描述
  description: "Just playing around",
  theme: require.resolve("../../theme/"),
  themeConfig: {
    // 设置logo
    logo: "/ikangxu.jpg",
    author: "IKangXu",
    navs: [
      // 默认为左侧底部设计
      { text: "关于", link: "/notes/type1/2020/0101", blank: false },
      { text: "友链", link: "/notes/type1/2020/0105", blank: false },
      { text: "RSS", link: "http://10.16.30.1:8080/rss.xml", blank: true }
    ],
    noteConfig: {
      bg: "/bg.jpg",
      // 来创建左侧菜单
      nav: [
        // 通过以下方式可以获取到相应的文章内容
        // _this['$'+_this.$themeConfig.noteConfig.nav[0].frontmatter.id].map[_this.$themeConfig.noteConfig.nav[0].frontmatter.key]
        {
          text: "测试非目录", // 左侧栏名称
          icon: "",
          frontmatter: {
            // 指定frontmatter内容
            id: "categories", // 指向vuepress-plugin-blog中的frontmatter
            key: "front" // Markdown中的frontmatter配置的categories值
          }
        },
        {
          text: "语言",
          icon: "",
          frontmatter: { id: "language" }, // 通过这种方式进行分组设置
          open: true,
          items: [
            {
              text: "Java",
              icon: "",
              frontmatter: { key: "Java" },
              items: [
                {
                  text: "SpringBoot",
                  icon: "",
                  frontmatter: { key: "SpringBoot" }
                },
                {
                  text: "SpringCloud",
                  icon: "",
                  frontmatter: { key: "SpringCloud" }
                }
              ]
            },
            {
              text: "JavaScript",
              icon: "",
              frontmatter: { key: "JavaScript" },
              items: [
                {
                  text: "Vue",
                  icon: "",
                  frontmatter: { key: "Vue" }
                },
                {
                  text: "React",
                  icon: "",
                  frontmatter: { key: "React" }
                }
              ]
            }
          ]
        }
        // ,
        // {
        //   text: "目录",
        //   icon: "iconqq",
        //   link: "", // 手动指定link优先选择
        //   frontmatter: { id: "tags" }, // 通过这种方式进行分组设置
        //   items: [
        //     {
        //       text: "Vue",
        //       icon: "iconqq",
        //       link: "",
        //       frontmatter: { key: "Vue" }
        //     },
        //     { text: "Java", icon: "iconqq", frontmatter: { key: "Java" } },
        //     {
        //       text: "Vuepress",
        //       icon: "iconqq",
        //       link: "",
        //       frontmatter: { key: "Vuepress" }
        //     }
        //   ]
        // }
      ],
      // 联系我设置内容
      contact: {
        enabled: true,
        items: [
          {
            text: "Vuepress",
            link: "https://v0.vuepress.vuejs.org/zh/",
            icon: "iconqq"
          },
          {
            text: "GitHub",
            link: "https://vuepress-plugin-blog.ulivz.com",
            icon: "iconyanzheng-jianshu"
          },
          { text: "设计灵感", link: "https://yelog.org/", icon: "iconweibo" },
          { text: "设计灵感2", link: "https://yelog.org/", icon: "iconmayun" },
          {
            text: "设计灵感3",
            link: "https://yelog.org/",
            icon: "iconzhihu-copy"
          },
          { text: "设计灵感4", link: "https://yelog.org/", icon: "icongithub" }
        ]
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
};
