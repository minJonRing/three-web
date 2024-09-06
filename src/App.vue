<template>
  <!-- <Background /> -->
  <div class="body">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
  <!-- loading -->
  <Loading />
</template>
<script>
import Background from '@/views/background.vue'
import Loading from '@/components/loading.vue'
export default {
  name: "App",
  components: {
    Background,
    Loading
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
    position: relative;
    height: 100%;
    z-index: 9;

    nav {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9
    }
  }
}
</style>
