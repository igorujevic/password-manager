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
      all password vaults
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapGetters } from 'vuex';
import passwordVault from '@/api/passwordVault';

export default {
  name: 'home',
  data: () => ({
    isLoading: false,
    message: '',
    pageUrl: '',
    name: '',
    password: ''
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
      .catch(error => {
        console.log(error);
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
  components: {
    BaseButton,
    BaseField
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

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
}
</style>
