<template>
  <div class="sponsor" v-if="enabled">
    <i class="item-icon iconfont icondashang" @click="changePay(true)"></i>

    <div class="img" v-show="showPay">
      <img v-for="(item,i) in sponsor" :src="item" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Sponsor",
  data() {
    return {
      showPay: false
    };
  },
  computed: {
    enabled() {
      if(this.$page.frontmatter.sponsor === undefined) {
        return true;
      }
      return this.$page.frontmatter.sponsor;
    },
    sponsor() {
      return this.$themeConfig.sponsor
    }
  },
  mounted() {
    let _this = this;
    _this.$router.afterEach((to, from) => {
      if (to && from && to.path === from.path) {
        return;
      }
      _this.changePay();
    });
  },
  methods: {
    changePay(isClick) {
      if (this.showPay) {
        this.showPay = false;
      } else {
        this.showPay = true;
      }

      if(!isClick) {
        this.showPay = false;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.sponsor
    text-align center
    background-color #fff
    max-width 1000px
    min-width 200px
    margin 0 auto
    margin-top 3rem
    i
        font-size 3rem
        border-radius 2rem
        box-shadow 2px 0 6px rgba(0, 0, 0, 0.35)
        cursor pointer
    .img
        -moz-user-select none/*火狐*/
        -webkit-user-select none/*webkit浏览器*/
        -ms-user-select none/*IE10*/
        -khtml-user-select none/*早期浏览器*/
        user-select none
        img
            padding .1rem
            max-width 10rem !important
            box-shadow 0px 0 10px rgba(0,0,0,0.35)
            margin 1rem .3rem
</style>
