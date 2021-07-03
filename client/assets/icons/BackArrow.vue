<template>
  <div @click="goBack" class="back-arrow-icon">
    <span class="fas fa-arrow-left" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'back-arrow',
  data: () => ({
  }),
  methods: {
    goBack() {
      if(this.$router.currentRoute.path === "/account") this.$router.push({ name: "Dashboard" });
      else this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.back-arrow-icon {
  padding: 5px 10px;
  color: $primaryColor;
  border-radius: 50%;
  border: 1px solid $primaryColor;
  width: calc(50px - 20px);
  height: calc(50px - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 $hoverShadow;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 2px 4px 0 $hoverShadow;
    cursor: pointer;
  }

  .fa-arrow-left {
    color: $primaryColor;
    font-size: 24px;
  }
}
</style>
