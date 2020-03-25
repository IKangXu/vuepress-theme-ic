const path = require('path')

// Theme API.
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
        .keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
  )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },
    plugins: [
      // [require('@ikangxu/vuepress-plugin-first-loading')],
      ['@vuepress/active-header-links', options.activeHeaderLinks],      
      '@vuepress/plugin-nprogress',
      ['@vuepress/plugin-blog', {
        frontmatters: [
          ///////////////// 构造标签 //////////////////
          // { 
          //   id: "tags",
          //   keys: ['tag'],
          //   path: '/tag/'
          // },
          {
            id: "other",
            keys: ['other'],
            path: '/other/'
          },
          ///////////////// 构造分类 //////////////////
          {
            id: "language",
            keys: ['language'],
            path: '/language/'
          }
        ]
      }],
      '@vuepress/medium-zoom',
      [
        '@ikangxu/vuepress-plugin-rss',
        {
          base_url: '/', // required
          site_url: 'http://10.16.30.1:8080', // required
          copyright: '2020 IKangXu', // optional
          // filter some post
          filter: (frontmatter) => { return [true|false] },
          // How much articles
          count: 20
        }
      ],
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'notitle',
        defaultTitle: ''
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}