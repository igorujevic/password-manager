<template>
  <div id="desktop-layout">
    <DeskHeader />
    <router-view name="desktop" />
  </div>
</template>

<script>
import DeskHeader from '@/components/desktop/DeskHeader.vue';

export default {
  name: 'desktop-layout',
  components: {
    DeskHeader
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/main.scss";

#desktop-layout {
  width: 100%;
  height: 100%;
  margin-top: 70px;
}

</style>
