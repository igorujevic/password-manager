<template>
  <div class="home-mobile">
    <img class="app-logo-img" alt="App logo" src="../../assets/logo.png" />
    <h1>This app is only for desktop use</h1>
    <h3>Contact us for more info</h3>
    <a href="mailto:info@passwordmanager.com">click here <i class="fas fa-envelope" /> </a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.home-mobile {
  width: calc(100% - 30px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 15px;

  .app-logo-img {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }

  h1 {
    color: $primaryFontColor;
    margin-bottom: 20px;
  }

  h3 {
    color: $primaryFontColor;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: $primaryColor;
  }
}
</style>
