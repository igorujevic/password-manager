<template>
  <div class="home">
    <div class="first-section">
      <div class="first-section-text">
        <h1>Your most-loved password manager</h1>
        <p>
          This Password Manager is the easiest way to store and use strong passwords.
        </p>
        <a href="/register">Get Started</a>
      </div>
      <img class="first-section-img" src="../../assets/images/undraw_Safe_re_kiil.svg" alt="work-img">
    </div>
    <div class="bottom-cards">
      <LearnMoreCard />
      <LearnMoreCard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LearnMoreCard from '@/components/desktop/LearnMoreCard';

export default {
  name: 'home',
  data: () => ({
  }),
  components: {
    LearnMoreCard
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.home {
  width: calc(100% - 160px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 80px 200px;
  position: relative;

  .first-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    position: relative;

    &-text {
      width: calc(100% - 550px);
      max-width: 515px;
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 45px;
        font-weight: 600;
        margin-bottom: 15px;
        color: $primaryColor;
        @media screen and (max-width: 1150px) {
          font-size: 35px;
        }
        @media screen and (min-width: 1500px) {
          font-size: 50px;
        }
      }
      p{
        font-size: 20px;
        text-align: justify;
        margin-bottom: 32px;
        @media screen and (min-width: 1500px) {
          font-size: 25px;
        }
      }
      a{
        @media screen and (min-width: 1025px) {
          cursor: pointer;
        }
        width: fit-content;
        text-decoration: none;
        font-size: 18px;
        font-weight: 600;
        padding: 10px 25px;
        border-radius: 10px;
        border: 1px solid $primaryColor;
        color: $primaryColor;
        transition: 0.25s ease;

        &:hover {
          color: $white;
          background: $primaryColor;
        }
      }
    }

    &-img {
      width: 550px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      @media screen and (max-width: 1150px) {
        max-height: 500px;
      }
    }
  }

  .bottom-cards {
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
    display: flex;

    .learn-more-card {
      &:first-of-type {
        margin-right: 10px;
      }

      &:last-of-type {
        margin-right: 80px;
      }
    }
  }
}
</style>
