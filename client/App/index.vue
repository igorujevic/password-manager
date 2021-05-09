<template>
  <div id="app">
    <template v-if="windowSize > 1024">
      <notifications position="top right" classes="my-notification" />
      <DesktopLayout />
      <token-expire-modal />
    </template>
    <template v-else>
      <MobileLayout />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import auth from '@/api/auth';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import TokenExpireModal from '@/components/universal/TokenExpireModal';

export default {
  data: () => ({
    windowSize: window.innerWidth,
    interval: null,
    firstTime: true
  }),
  computed: {
    ...mapGetters('user', ['authToken'])
  },
  methods: {
    ...mapActions('user', ['logoutUser']),
    onResize() {
      this.windowSize = window.innerWidth;
    }
  },
  watch: {
    authToken: function (val) {
      if (this.authToken) {
        this.interval = setInterval(async () => {
          try {
            await auth.verify({
              headers: {
                Authorization: `Bearer ${this.authToken}`
              }
            });
          } catch (_) {
            this.$modal.show('token-expire-modal');
            clearInterval(this.interval);
          }
        }, 5000);
      } else clearInterval(this.interval);
    }
  },
  async mounted() {
    if (this.authToken) {
      try {
        await auth.verify({
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        });
      } catch (_) {
        this.logoutUser();
      }
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  components: {
    DesktopLayout,
    MobileLayout,
    TokenExpireModal
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/main.scss";

.desktop-layout {
  width: 100%;
  height: 100%;
  margin-top: 70px;
}

.mobile-layout {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}

</style>
