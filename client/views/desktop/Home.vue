<template>
  <div class="home">
    <div>
      content
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
.home {
  width: calc(100% - 160px);
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 40px 80px 40px;
  position: relative;

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
