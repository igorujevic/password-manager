<template>
  <div id="mobile-layout">
    <router-view name="mobile" />
  </div>
</template>

<script>

export default {
  name: 'mobile-layout'
};
</script>

<style lang="scss">
@import "../assets/stylesheets/main.scss";

#mobile-layout {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}

</style>
