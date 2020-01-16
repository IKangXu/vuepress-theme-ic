<template>
  <div>
    <!-- 内容导航 -->
    <NoteSidebar />
    <!-- 内容 -->
    <Content />
  </div>
</template>
<script>
import NoteSidebar from "@theme/components/NoteSidebar.vue";
export default {
  name: "NotePage",
  data() {
    return {
      
    };
  },
  components: {
    NoteSidebar
  },
  mounted() {
    // let hash = this.$router.app._route.hash;
    // if (hash) {
    //   hash = decodeURIComponent(hash);
    //   document.querySelector(hash).scrollIntoView();
    // }
  },
  methods: {
    
  }
};
</script>
