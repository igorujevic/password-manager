<template>
  <div class="desk-account-page">
    <h1>Account page</h1>
    <p>since {{ createdAt }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { convertISOToDate } from '../../helpers/functions';
import { mapGetters } from 'vuex';

export default {
  name: 'account',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['userData']),
    createdAt: function () {
      return convertISOToDate(this.userData.createdAt);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  async created() {
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.desk-account-page {
  width: calc(100% - 160px);
  min-height: 90vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 80px 40px;
  position: relative;
  color: #222222;
}
</style>
