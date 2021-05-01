<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div @click="showModal" class="open-create-btn">
      <span class="fas fa-plus-circle fa-2x"></span>
    </div>
    <modal name="create-pv-modal" classes="pv-modal">
      <div class="create-content">
        <div class="create-content-header">
          <h2>Create new Password Vault</h2>
          <div @click="closeModal">
            <span class="far fa-times-circle fa-2x close-create-btn"></span>
          </div>
        </div>
        <validation-observer v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createNewPasswordVault)" class="eager form-container">
            <validation-provider
              v-slot="{ errors }"
              name="PageUrl"
              mode="eager"
              :rules="{ required: true, url: true }"
              class="">
              <base-field
                v-model.trim="pageUrl"
                :error="errors[0]"
                type="text"
                placeholder="PageUrl" />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              mode="eager"
              :rules="{ required: true }"
              class="">
              <base-field
                v-model="name"
                :error="errors[0]"
                type="text"
                placeholder="Name" />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              mode="eager"
              :rules="{ required: true, min: { length: 8 } }"
              class="mt-xs">
              <base-field
                v-model="password"
                :error="errors[0]"
                type="password"
                placeholder="Password" />
            </validation-provider>
            <base-button
              type="submit"
              :text="isLoading ? 'Loading' : 'Create'"
              class="create-pv-btn"
              :icon="isLoading ? 'fa fa-spinner fa-spin' : null"
              primary
              rounded />
          </form>
        </validation-observer>
        <div v-if="message"> {{ message }} </div>
      </div>
    </modal>
    <div class="all-password-vaults-container">
      <h2>Your passwords:</h2>
      <div v-if="loadPasswords" class="no-content-wrapper">
        <loader />
      </div>
      <div v-else class="passwords-container">
        <div v-if="!allPasswords.length">no saved passwords</div>
        <ul v-else class="list">
          <password-vault-card v-for="pv in allPasswords" :key="pv._id" :data="pv" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import Loader from '../../components/universal/Loader';
import { mapGetters } from 'vuex';
import passwordVault from '@/api/passwordVault';
import PasswordVaultCard from '../../components/desktop/PasswordVaultCard';

export default {
  name: 'dashboard',
  data: () => ({
    isLoading: false,
    message: '',
    pageUrl: '',
    name: '',
    password: '',
    loadPasswords: true,
    allPasswords: []
  }),
  computed: {
    ...mapGetters('user', ['authToken'])
  },
  methods: {
    createNewPasswordVault() {
      this.isLoading = true;
      passwordVault.create({
        pageUrl: this.pageUrl,
        name: this.name,
        password: this.password
      }, {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      })
      .then(({ data: { message } }) => {
        this.$notify({
          type: 'success',
          text: `${message} (${this.name})`,
          duration: 3000
        });
        this.pageUrl = '';
        this.name = '';
        this.password = '';
      })
      .catch(() => {
        this.$notify({
          type: 'success',
          text: 'Something went wrong! Try later.',
          duration: 3000
        });
      })
      .finally(() => {
        this.isLoading = false;
        this.$modal.hide('create-pv-modal');
      });
    },
    showModal() {
      this.$modal.show('create-pv-modal');
    },
    closeModal() {
      this.$modal.hide('create-pv-modal');
    }
  },
  async mounted() {
    passwordVault.getAll({
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .then(({ data }) => {
      this.allPasswords = data.passwords;
    })
    .catch(() => {
      this.$notify({
        type: 'error',
        text: 'Something went wrong while loading data! Try later or contact us.',
        duration: 5000
      });
    })
    .finally(() => {
      this.loadPasswords = false;
    });
  },
  components: {
    BaseButton,
    BaseField,
    Loader,
    PasswordVaultCard
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/variables';
@import '@/assets/stylesheets/animations';

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

  .create-content {
    max-width: 600px;
    width: 100%;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;

      .close-create-btn {
        color: $primaryColor;
        cursor: pointer;
        transition: 0.25s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .form-container {
      width: 100%;

      .base-field-container {
        max-width: 600px !important;
        width: 100%;
      }
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
      grid-template-columns: repeat( auto-fit, minmax(380px, 1fr) );
      gap: 10px;
    }
  }
}
</style>
