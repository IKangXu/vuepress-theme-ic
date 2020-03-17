<template>
    <div class="back-top" @click="backTop">
        <i class="item-icon iconfont iconicon-test"></i>
    </div>   
</template>
<script>
export default {
    name: 'BackTop',
    data() {
        return {}
    },
    props: {
        parentCls: String
    },
    methods: {
        backTop() {
            document.getElementsByClassName(this.parentCls)[0].scrollTop = 0;
        }
    }
}
</script>
<style lang="stylus">
    .back-top
        .item-icon
            position absolute
            z-index 4
            bottom 2rem
            right 1rem
            color #ffffff
            background-color rgba(0,0,0,.8)
            padding .5rem
            font-size 1.7rem
            cursor pointer
</style>