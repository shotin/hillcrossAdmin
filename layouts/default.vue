<template>
  <body class="font-muli theme-cyan gradient">
    <div id="main_content">
      <outer-sidebar />
      <div class="page">
        <!-- nav -->
        <nav-bar />
        <nuxt />

        <footer />
      </div>
    </div>
  </body>
</template>
<script>
import Footer from "./partials/Footer.vue";
import NavBar from "./partials/Nav.vue";
import OuterSidebar from "./sidebar/OuterSidebar.vue";
export default {
  middleware: ["auth", "select"],

  components: {
    Footer,
    NavBar,
    OuterSidebar,
  },
};
</script>
<style>
.metismenu ul a::before {
  display: none !important;
}
.metismenu ul a {
  color: #4d5052;
  font-size: 13px;
  padding: 5px 5px 5px 10px;
  position: relative;
}
</style>
