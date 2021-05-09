<template>
  <div class="not-found">
    <h1>PAGE NOT FOUND</h1>
    <h3>ERROR 404</h3>
    <base-button
      @click="goBack"
      :text="isLoggedIn ? 'Go to Dashboard' : 'Go to Home'"
      class="not-found-btn"
      primary
      rounded />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseButton from '@/components/universal/BaseButton';
import { mapGetters } from 'vuex';

export default {
  name: 'not-found',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    goBack() {
      if (this.isLoggedIn) this.$router.push({ name: 'Dashboard' });
      else this.$router.push({ name: 'Home' });
    }
  },
  components: {
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.not-found {
  width: 100%;
  min-height: 90vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 45px;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 30px;
    margin-bottom: 25px;
  }

  .not-found-btn {
    max-width: fit-content !important;
  }
}
</style>
