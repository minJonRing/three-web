<template>
  <Background />
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
  }
}
</script>
<style lang="scss">
@import url(@/style/index.scss);


#app {
  height: 100%;

  .body {
    position: relative;
    height: 100%;
    z-index: 9;
  }
}
</style>
