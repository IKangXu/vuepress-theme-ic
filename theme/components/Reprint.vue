<template>
  <div class="reprint" v-if="reprint">
    <header>转载自</header>
    <table>
      <tr>
        <td>作者</td>
        <td>{{reprint.author}}</td>
      </tr>
      <tr>
        <td>文章</td>
        <td>
          <a
            :href="reprint.link"
            target="_blank"
            rel="noopener noreferrer"
            >{{reprint.title}}</a
          >
          <OutboundLink />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "Reprint",
  data() {
    return {};
  },
  computed: {
    reprint() {
      return this.$page.frontmatter.reprint;
    }
  }
};
</script>
<style lang="stylus" scoped>
.reprint
    border-left 0.5rem solid $accentColor
    padding 0.5rem 1rem
    background-color #282c34
    margin-top 3rem
    color #fff
    tr
        border 0
        padding 0.2em 1em 0.2em 0
        &:nth-child(2n)
            background-color transparent
    td
        border 0
        padding 0.2em 1em 0.2em 0
    header
        font-size 1.2rem
        margin-bottom 1rem
</style>
