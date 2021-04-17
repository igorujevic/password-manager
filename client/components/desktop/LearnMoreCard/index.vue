<template>
  <div class="learn-more-card">
    <div class="learn-more-card-img">
      <img src="../../../assets/images/secure-card-img.png" alt="leran-more-card-img">
    </div>
    <div class="learn-more-card-content">
      <h3>Lorem ipsum dolor sit.</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos!</p>
      <a href="/">Learn more <span class="fas fa-chevron-right"></span></a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'learn-more-card'
};
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/_variables';

.learn-more-card {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid $lightPrimaryColorFont;
  background: $white;
  max-height: 190px;

  &-img {
    width: 190px;
    height: 190px;
    overflow: hidden;

    img {
       width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-content {
    padding: 25px;
    width: calc(100% - 50px);

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    p{
      margin-bottom: 35px;
    }

    a {
      display: inline-block;
      transition: 0.25s ease;
      @media screen and (min-width: 1025px) {
        cursor: pointer;
      }
      &:hover {
        transform: translate(10px, 0px);
      }
      text-decoration: none;
      font-weight: 600;
      color: $primaryColor;

      svg {
        transform: translateY(1px);
      }
    }
  }
}
</style>
