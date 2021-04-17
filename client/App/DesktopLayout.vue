<template>
  <div id="desktop-layout">
    <DeskHeader />
    <router-view name="desktop" />
    <DeskFooter />
  </div>
</template>

<script>
import DeskFooter from '@/components/desktop/DeskFooter';
import DeskHeader from '@/components/desktop/DeskHeader';

export default {
  name: 'desktop-layout',
  components: {
    DeskFooter,
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
