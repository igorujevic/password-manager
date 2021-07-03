<template>
  <modal name="create-pv-modal" classes="pv-modal" :click-to-close="false">
    <div class="create-content">
      <div class="create-content-header">
        <h2>Create new Password Vault</h2>
        <div @click="closeModal">
          <span class="far fa-times-circle fa-2x close-create-btn" />
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
</template>

<script>
// @ is an alias to /src
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapGetters } from 'vuex';
import passwordVault from '@/api/passwordVault';

export default {
  name: 'create-password-vault-modal',
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
      .then(({ data }) => {
        this.$emit('newPasswordVaultCreated', {
          _id: data.newPasswordVault._id,
          pageUrl: this.pageUrl,
          name: this.name,
          password: this.password
        });
        this.$notify({
          type: 'success',
          text: `${data.message} (${this.name})`,
          duration: 3000
        });
        this.pageUrl = '';
        this.name = '';
        this.password = '';
      })
      .catch(() => {
        this.$notify({
          type: 'error',
          text: 'Something went wrong! Try later.',
          duration: 3000
        });
      })
      .finally(() => {
        this.isLoading = false;
        this.$modal.hide('create-pv-modal');
      });
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
@import '@/assets/stylesheets/variables';
@import '@/assets/stylesheets/animations';

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

</style>
