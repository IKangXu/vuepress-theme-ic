<template>
  <div class="waves-area">
    <svg
      class="waves-svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
        ></path>
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0"></use>
        <use xlink:href="#gentle-wave" x="48" y="3"></use>
        <!-- <!-- <use xlink:href="#gentle-wave" x="48" y="5"></use> -->
        <!-- <use xlink:href="#gentle-wave" x="48" y="7"></use> -->
        -->
      </g>
    </svg>
  </div>
</template>
<style lang="stylus" scoped>
.waves-area
      position fixed
      bottom 0
      width 100%
      z-index 10
      pointer-events none
      .waves-svg
        width 100%
        height 6rem
        // -webkit-transform rotateX(180deg)
        // transform rotateX(180deg)
        overflow hidden
        vertical-align middle
      .parallax
        > use
          &:first-child
            -webkit-animation-delay -2s
            animation-delay -2s
            -webkit-animation-duration 7s
            animation-duration 7s
            fill hsla(0,0%,100%,.1)
          &:nth-child(2)
            -webkit-animation-delay:-3s;
            animation-delay:-3s;
            -webkit-animation-duration:10s;
            animation-duration:10s;
            fill:hsla(0,0%,100%,.1)
          &:nth-child(3)
            -webkit-animation-delay:-4s;
            animation-delay:-4s;
            -webkit-animation-duration:13s;
            animation-duration:13s;
            fill:hsla(0,0%,100%,.1)
          &:nth-child(4)
            -webkit-animation-delay:-5s;
            animation-delay:-5s;
            -webkit-animation-duration:20s;
            animation-duration:20s;
            fill:hsla(0,0%,100%,.1)
        > use
          -webkit-animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
          animation-duration: 25s;
          animation-delay: 0s;

@-webkit-keyframes move-forever {
 0% {
  -webkit-transform:translate3d(-90px,0,0);
  transform:translate3d(-90px,0,0)
 }
 to {
  -webkit-transform:translate3d(85px,0,0);
  transform:translate3d(85px,0,0)
 }
}
@keyframes move-forever {
 0% {
  -webkit-transform:translate3d(-90px,0,0);
  transform:translate3d(-90px,0,0)
 }
 to {
  -webkit-transform:translate3d(85px,0,0);
  transform:translate3d(85px,0,0)
 }
}
</style>
