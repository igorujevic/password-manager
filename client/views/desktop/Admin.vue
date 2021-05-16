<template>
  <div class="desk-admin-page">
    <h1>Admin page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import BackArrow from "../../assets/icons/BackArrow";
import BaseButton from "../../components/universal/BaseButton";
import { mapGetters } from 'vuex';

export default {
  name: 'account',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['userData'])
  },
  methods: {
  },
  async created() {
  },
  components: {
    BackArrow,
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.desk-admin-page {
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
