<template>
  <div v-show="showFooter" class="desk-footer">
    <div class="desk-footer-content">
      <div class="links-holder">
        <p>Password Manager:</p>
        <ul class="links">
          <li>
            <a href="/">Terms of Service</a>
          </li>
          <li>
            <a href="/">Privacy Policy</a>
          </li>
          <li>
            <a href="/">Cookie Policy</a>
          </li>
          <li>
            <a href="/">Pricing</a>
          </li>
        </ul>
      </div>
      <div class="links-holder">
        <p>Learn more:</p>
        <ul class="links">
          <li>
            <a href="/">Security</a>
          </li>
          <li>
            <a href="/">Cryptography</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="desk-footer-credits">
      <div class="desk-footer-credits-container">
        <div class="desk-footer-credits-copyright">
          <p>Sveučilište u Splitu</p>
          <p>Fakultet elektrotehnike, strojarstva i brodogradnje</p>
          <p>Igor Ujević, diplomski rad</p>
        </div>
        <div class="desk-footer-credits-community">
          <p>Contact:</p>
          <div>
            <a href="/" target="_blank">
              <span class="fab fa-linkedin fa-lg icon"></span>
            </a>
            <a href="/" target="_blank">
              <span class="fab fa-github-square fa-lg icon"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "desk-footer",
  data: () => ({
    showFooter: true
  }),
  computed: {
    ...mapGetters("user", ["isLoggedIn"])
  },
  methods: {
    toHome() {
      if (this.isLoggedIn)
        this.$router.push({ name: "Dashboard" }).catch(() => {});
      else this.$router.push({ name: "Home" }).catch(() => {});
    },
    changeOnlyLogo() {
      if (["/login", "/register"].includes(this.$router.currentRoute.path))
        this.showFooter = false;
      else this.showFooter = true;
    }
  },
  watch: {
    $route(to) {
      if (["/login", "/register"].includes(to.path)) this.showFooter = false;
      else this.showFooter = true;
    }
  },
  created() {
    if (["/login", "/register"].includes(this.$router.currentRoute.path))
      this.showFooter = false;
    else this.showFooter = true;
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/stylesheets/_variables";

.desk-footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid darken($primaryColor, 10%);
  background-color: $primaryColor;
  box-shadow: 0 1px 0 0 #45474d;

  &-content {
    display: flex;
    width: calc(100% - 160px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 80px 15px;

    div:first-of-type {
      margin-bottom: 10px;
      margin-right: 100px;
    }

    .links-holder {
      font-size: 15px;
      color: $lightPrimaryColorFont;

      .links {
        display: flex;

        li {
          list-style: none;

          &:not(:last-of-type) {
            margin-right: 20px;
          }

          a {
            color: $lightPrimaryColorFont;
            cursor: pointer;
            text-decoration: none;
            transition: 0.25s ease;

            &:hover {
              color: $white;
            }
          }
        }
      }
    }
  }

  &-credits {
    width: calc(100% - 160px);
    margin: 0 auto;
    padding: 15px 80px;
    color: $lightPrimaryColorFont;
    font-size: 14px;
    background-color: $primaryColorDarker;

    &-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    &-copyright {
      width: 50%;
    }

    &-community {
      a {
        text-decoration: none;

        &:not(:last-of-type) {
          margin-right: 10px;
        }
      }

      .icon {
        color: $lightPrimaryColorFont;
        font-size: 1.5rem;
        transition: 0.25s ease;

        &:hover {
          color: $white;
        }
      }
    }
  }
}
</style>
