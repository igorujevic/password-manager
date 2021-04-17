<template>
  <div id="app">
    <template v-if="windowSize > 1024">
      <DesktopLayout />
    </template>
    <template v-else>
      <MobileLayout />
    </template>
  </div>
</template>

<script>
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

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
  },
  components: {
    DesktopLayout,
    MobileLayout
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/main.scss";

.desktop-layout {
  width: 100%;
  height: 100%;
  margin-top: 70px;
}

.mobile-layout {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}

</style>
