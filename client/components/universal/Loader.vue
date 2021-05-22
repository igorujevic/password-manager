<template>
  <div class="loader">
    <i class="fas fa-spinner slow-spin" />
  </div>
</template>

<script>

export default {
  name: 'loader'
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/_variables";

.loader {
  font-size: 128px;
  color: $primaryColor;

  .slow-spin {
  -webkit-animation: fa-spin 1s infinite linear;
  animation: fa-spin 1s infinite linear;
}
}
</style>
