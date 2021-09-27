<template>
  <span>
    <!-- far left side -->
    <far-left-sidebar />
    <!-- pop side -->
    <!-- <far-right-pop /> -->
    <!-- color switcher -->
    <!-- <color-switcher /> -->
    <!-- pop from bottom -->
    <!-- <right-bottom-pop /> -->
    <!-- sidebar -->
    <inner-sidebar />
  </span>
</template>
<script>
import FarLeftSidebar from "./partials/FarLeftSidebar.vue";
import FarRightPop from "./partials/FarRightPop.vue";
import ColorSwitcher from "./partials/ColorSwitcher.vue";
import RightBottomPop from "./partials/RightBottomPop.vue";
import InnerSidebar from './partials/InnerSidebar.vue';
export default {
  components: {
    FarLeftSidebar,
    FarRightPop,
    ColorSwitcher,
    RightBottomPop,
    InnerSidebar,
  },
};
</script>
