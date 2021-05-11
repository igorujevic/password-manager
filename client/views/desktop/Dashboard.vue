<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="open-create-btn" @click="showModal">
      <span class="fas fa-plus-circle fa-2x" />
    </div>
    <create-password-vault-modal
      @newPasswordVaultCreated="saveNewPassowrdVault"
    />
    <div class="all-password-vaults-container">
      <h2>Your passwords:</h2>
      <input
        type="text"
        v-model="this.search"
        placeholder="Search..."
        name="search"
        id="search"
        class="search-bar"
      />
      <div v-if="loadPasswords" class="no-content-wrapper">
        <loader />
      </div>
      <div v-else class="passwords-container">
        <div v-if="!allPasswords.length">no saved passwords</div>
        <ul v-else class="list">
          <password-vault-card
            v-for="pv in allPasswords"
            :key="pv._id"
            @passwordVaultDeleted="removePasswordVaultFromArray"
            :data="pv"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import auth from "@/api/auth";
import CreatePasswordVaultModal from "../../components/universal/CreatePasswordVaultModal";
import Loader from "../../components/universal/Loader";
import passwordVault from "@/api/passwordVault";
import PasswordVaultCard from "../../components/desktop/PasswordVaultCard";
import { remove } from "lodash";

export default {
  name: "dashboard",
  data: () => ({
    loadPasswords: true,
    allPasswords: [],
    search: ""
  }),
  computed: {
    ...mapGetters("user", ["authToken"])
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    showModal() {
      this.$modal.show("create-pv-modal");
    },
    saveNewPassowrdVault(data) {
      this.allPasswords.unshift(data);
    },
    removePasswordVaultFromArray(id) {
      this.allPasswords = remove(this.allPasswords, n => n._id !== id);
    }
  },
  async created() {
    auth
      .verify({
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      })
      .then(() => {
        passwordVault
          .getAll({
            headers: {
              Authorization: `Bearer ${this.authToken}`
            }
          })
          .then(({ data }) => {
            this.allPasswords = data.passwords;
          })
          .catch(() => {
            this.$notify({
              type: "error",
              text:
                "Something went wrong while loading data! Try later or contact us.",
              duration: 5000
            });
          })
          .finally(() => {
            this.loadPasswords = false;
          });
      })
      .catch(() => {
        this.logoutUser();
        this.$router.push({ name: "Login" });
      });
  },
  components: {
    CreatePasswordVaultModal,
    Loader,
    PasswordVaultCard
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/variables";
@import "@/assets/stylesheets/animations";

.dashboard {
  width: calc(100% - 160px);
  height: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 80px 40px;
  position: relative;
  color: $primaryFontColor;

  h1 {
    margin-bottom: 25px;
  }

  .open-create-btn {
    position: absolute;
    right: 80px;
    top: 40px;
    cursor: pointer;
    color: $primaryColor;
    transition: 0.25s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .all-password-vaults-container {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;

    .no-content-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    h2 {
      margin-bottom: 25px;
    }

    .list {
      -webkit-animation: fadeIn 0.25s ease forwards;
      animation: fadeIn 0.25s ease forwards;
      display: grid;
      /* define the number of grid columns */
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 10px;
    }
  }
}
</style>
