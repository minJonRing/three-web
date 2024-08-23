<template>
  <!-- <Background /> -->
  <div class="body">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import Background from '@/views/background.vue'
export default {
  name: "App",
  components: {
    Background
  },
  mounted() {

  }
}
</script>
<style lang="scss">
@import url(@/style/index.scss);

#app {
  height: 100%;
  // overflow: hidden;
  // display: flex;
  // align-items: center;
  // justify-content: center;


  .body {
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    // width: 1920px;
    // height: 1080px;
    height: 100%;
    z-index: 9;
    // transform-origin: center center;

    nav {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
