import { findPageForPath } from "@app/util";
import pageComponents from "@internal/page-components";

export default ({ Vue, router }) => {
  // 修复问题 https://github.com/vuejs/vuepress/issues/1173
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component);
  }
  Vue.mixin({
    methods: {
      getPageKey(pages, path) {
        const result = findPageForPath(pages, path);
        return result.key;
      }
    }
  });
};
