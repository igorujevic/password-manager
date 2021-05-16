<template>
  <div class="desk-update-data-page container">
    <back-arrow />
    <h1>Update your data</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(updateData)" class="eager form-container">
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="Email"
          :rules="{ required: true, email: true }"
          class="">
          <base-field
            v-model.trim="email"
            @focus="clearMessage"
            :error="errors[0]"
            type="text"
            placeholder="Email"
            />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="Username"
          :rules="{ required: true, min: { length: 8 } }"
          class="">
          <base-field
            v-model="username"
            @focus="clearMessage"
            :error="errors[0]"
            type="text"
            placeholder="Username" />
        </validation-provider>
        <base-button
          type="submit"
          :text="isLoading ? 'Loading' : 'Update data'"
          class="update-data-page-btn"
          :icon="isLoading ? 'fa fa-spinner fa-spin' : null"
          primary
          rounded />
      </form>
    </validation-observer>
    <div v-if="message" class="update-data-page-error-message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
import BackArrow from "../../assets/icons/BackArrow";
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'change-password',
  data: () => ({
    username: '',
    email: '',
    message: '',
    isLoading: false
  }),
  computed: {
    ...mapGetters("user", ["authToken"]),
    ...mapGetters("user", ["userData"])
  },
  methods: {
    ...mapActions('user', ['saveUserData']),
    clearMessage() {
      this.message = '';
    },
    updateData() {
      this.isLoading = true;
      auth.updateUserData(
        {
          username: this.username,
          email: this.email
        },
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        }
      )
        .then(({ data }) => {
          this.saveUserData(data.userData);
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
  created() {
    this.username = this.userData.username;
    this.email = this.userData.email;
  },
  components: {
    BackArrow,
    BaseButton,
    BaseField
  }
};
</script>

<style lang="scss">
@import "../../assets/stylesheets/variables";

.desk-update-data-page.container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .back-arrow-icon {
    position: absolute;
    left: 80px;
    top: 25px;
  }

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

  .update-data-page-btn {
    max-width: 100%;
  }

  .update-data-page-error-message {
    margin: 20px 0px;
    color: $error;
  }
}

</style>
