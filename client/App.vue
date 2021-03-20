<template>
  <div id="app">
    <router-view v-if="windowSize > 1024" name="desktop" />
    <router-view v-else name="mobile" />
  </div>
</template>

<script>
export default {
  data: () => ({
    windowSize: window.innerWidth
  }),
  methods: {
    onResize() {
      this.windowSize = window.innerWidth;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  color: #2c3e50;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
