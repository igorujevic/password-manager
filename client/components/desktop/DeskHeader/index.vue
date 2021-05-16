<template>
  <div class="desk-header">
    <img @click="toHome" class="logo" alt="Vue logo" :src="logo" />
    <div v-show="!onlyLogo">
      <div v-if="!isLoggedIn" class="header-nav not-logged-in">
        <router-link :to="{ name: 'Login' }" class="header-nav-link">
          Login
        </router-link>
        <br />
        <router-link :to="{ name: 'Register' }" class="header-nav-link">
          Register
        </router-link>
      </div>
      <div v-else class="header-nav logged-in">
        <router-link :to="{ name: 'Account' }" class="header-nav-link">
          Account
        </router-link>
        <br />
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Logo from "@/assets/logo.png";

export default {
  name: "desk-header",
  data: () => ({
    onlyLogo: false,
    logo: Logo
  }),
  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
    ...mapGetters("user", ["isAdmin"])
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    toHome() {
      if (this.isLoggedIn)
        this.$router.push({ name: "Dashboard" }).catch(() => {});
      else this.$router.push({ name: "Home" }).catch(() => {});
    },
    changeOnlyLogo() {
      if (["/login", "/register"].includes(this.$router.currentRoute.path) && this.isAdmin)
        this.onlyLogo = true;
      else this.onlyLogo = false;
    },
    logout() {
      this.logoutUser();
      this.$notify({
        type: "success",
        text: "You are logged out.",
        duration: 3000
      });
      this.$router.push({ name: "Login" });
    }
  },
  watch: {
    $route(to) {
      if (["/login", "/register"].includes(to.path)) this.onlyLogo = true;
      else this.onlyLogo = false;
    }
  },
  created() {
    if (["/login", "/register"].includes(this.$router.currentRoute.path))
      this.onlyLogo = true;
    else this.onlyLogo = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/stylesheets/_variables";

.desk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: calc(100% - 60px);
  height: calc(70px - 1px - 20px);
  padding: 10px 30px;
  background: $white;
  border-bottom: 1px solid $lightGrey;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);

  .logo {
    width: auto;
    height: 50px;
    cursor: pointer;
  }

  .header-nav.not-logged-in {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;

    .header-nav-link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;

      &:not(:last-of-type) {
        margin-right: 10px;
      }

      &:first-of-type {
        width: calc(80px - 10px);
        padding: 5px 5px;
        color: $white;
        background: $primaryColor;
        border: 1px solid $primaryColor;
        border-radius: 10px;
        cursor: pointer;
        transition: color 0.25s ease;
        transition: background 0.25s ease;
      }

      &:last-of-type {
        width: calc(80px - 10px);
        padding: 5px 5px;
        color: $primaryColor;
        border: 1px solid $primaryColor;
        border-radius: 10px;
        cursor: pointer;
        transition: color 0.25s ease;
        transition: background 0.25s ease;
      }

      &:first-of-type:hover {
        color: $primaryColor;
        background: $white;
        box-shadow: 0 15px 10px -15px $black;
      }

      &:last-of-type:hover {
        color: $white;
        background: $primaryColor;
        box-shadow: 0 15px 10px -15px $black;
      }
    }
  }

  .header-nav.logged-in {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;

    .header-nav-link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      margin-right: 10px;
      font-size: 16px;

      &:hover {
        color: $primaryColor;
      }
    }

    button {
      background: $primaryColor;
      border: 1px solid $primaryColor;
      padding: 5px;
      border-radius: 10px;
      color: $white;
      cursor: pointer;
      transition: 0.25s ease;
      font-size: 16px;

      &:hover {
        box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
        background: $white;
        color: $primaryColor;
      }
    }
  }
}
</style>
