<template>
  <div class="sponsor">
    <i class="item-icon iconfont icondashang" @click="changePay"></i>

    <div class="img" v-show="showPay">
      <img src="/alipay.jpg" />
      <img src="/Tenpay.png" />
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
    changePay() {
      if (this.showPay) {
        this.showPay = false;
      } else {
        this.showPay = true;
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
            max-width 10rem
            box-shadow 0px 0 10px rgba(0,0,0,0.35)
            margin 1rem .3rem
</style>
