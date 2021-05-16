<template>
  <div class="desk-change-password container">
    <h1>Change your password</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(changePassword)" class="eager form-container">
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="Old password"
          :rules="{ required: true }"
          class="">
          <base-field
            v-model.trim="oldPassword"
            @focus="clearMessage"
            :error="errors[0]"
            type="password"
            placeholder="Old password" />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="New password"
          vid="newPassword"
          :rules="{ required: true, min: { length: 8 } }"
          class="">
          <base-field
            v-model="newPassword"
            @focus="clearMessage"
            :error="errors[0]"
            type="password"
            placeholder="New password" />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="New password repeat"
          :rules="{ required: true, confirmation: { target: '@newPassword' } }"
          class="mt-xs">
          <base-field
            v-model="repeat"
            @focus="clearMessage"
            :error="errors[0]"
            type="password"
            placeholder="Repeat new password" />
        </validation-provider>
        <base-button
          type="submit"
          :text="isLoading ? 'Loading' : 'Update'"
          class="update-btn"
          :icon="isLoading ? 'fa fa-spinner fa-spin' : null"
          primary
          rounded />
      </form>
    </validation-observer>
    <div v-if="message" class="change-password-error-message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapGetters } from 'vuex';

export default {
  name: 'change-password',
  data: () => ({
    oldPassword: '',
    newPassword: '',
    repeat: '',
    message: '',
    isLoading: false
  }),
  computed: {
    ...mapGetters("user", ["authToken"])
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    changePassword() {
      this.isLoading = true;
      auth.updatePassword(
        {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        }
      )
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            text: 'Password changed successfuly.',
            duration: 3000
          });
          this.$router.push({ name: 'Account' });
        })
        .catch(({ response: { data, status } }) => {
          this.message = status >= 400 && status < 500 ? `${data.message}. Old password is wrong.` : 'Something went wrong. Try again.';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  components: {
    BaseButton,
    BaseField
  }
};
</script>

<style lang="scss">
@import "../../assets/stylesheets/variables";

.desk-change-password.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-top: 50px;
    margin-bottom: 25px;
    color: $primaryColor;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .last-input {
      margin-bottom: 15px;
    }
  }

  .change-password-btn {
    max-width: 100%;
  }

  .change-password-error-message {
    margin: 20px 0px;
    color: $error;
  }
}

</style>
