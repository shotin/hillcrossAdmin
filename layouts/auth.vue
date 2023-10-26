<style lang="css">
.bg-image-lg {
  position: relative;
  overflow: hidden;
  background-image: url("../static/images/login/login_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.bg-image-sm {
  position: relative;
  overflow: hidden;
  background-image: url("../static/images/login/login_bg_mobile.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.bg-overlay {
  --backdrop-brightness: brightness(0.5);
  -webkit-backdrop-filter: var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia);
  backdrop-filter: var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia);
  background-color: rgb(170 170 170 / 88%);
  width: 100%;
  height: 100%;
}

/* Additional classes for other screen sizes */
</style>

<template>
  <div :class="{
    'bg-image-lg': isLargeScreen,
    'bg-image-sm': !isLargeScreen
  }">
    <div class="bg-overlay">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLargeScreen: false
    };
  },
  methods: {
    checkScreenSize () {
      this.isLargeScreen = window.innerWidth >= 721; // Adjust the breakpoint as needed
    }
  },
  mounted () {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },
  beforeUnmount () {
    window.removeEventListener("resize", this.checkScreenSize);
  }
};
</script>
