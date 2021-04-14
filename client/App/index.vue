<template>
  <div id="app">
    <DeskHeader />
    <div :class="windowSize > 1024 ? 'desktop-layout' : 'mobile-layout'">
      <router-view v-if="windowSize > 1024" name="desktop" />
      <router-view v-else name="mobile" />
    </div>
  </div>
</template>

<script>
import DeskHeader from '@/components/desktop/DeskHeader.vue';

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
    DeskHeader
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
