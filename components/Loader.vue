<template>
  <span class="circle-loader" :class="{'fullscreen' : fullscreen}">
    <svg class="circle" width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="15"/>
    </svg>
  </span>
</template>

<script>
export default {
  props: { fullscreen: { type: Boolean, default: false } }
}
</script>

<style lang="css">
  .circle-loader {
    display: block;
    text-align: center;
  }
  .circle-loader .circle {
    position: relative;
    fill: transparent;
    stroke: rgba(255, 51, 68, 0.5);
    stroke-width: 2px;
    animation: dash 2s ease infinite, rotate 2s linear infinite;
  }
  .circle-loader.fullscreen {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    z-index: 100;
    transform: translate(-50%, -50%);
  }
  .circle-loader.fullscreen .circle {
    position: initial;
    left: initial;
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1,95;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 85,95;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dasharray: 85,95;
      stroke-dashoffset: -93;
    }
  }
  @keyframes rotate {
    0% {transform: rotate(0deg); }
    100% {transform: rotate(360deg); }
  }
</style>