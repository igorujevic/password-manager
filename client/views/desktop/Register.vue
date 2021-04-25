<template>
  <div class="desk-register container">
    <h1>Register</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(register)" class="eager form-container">
        <validation-provider
          v-slot="{ errors }"
          name="E-mail"
          :rules="{ required: true, email: true }"
          class="">
          <base-field
            v-model.trim="email"
            :error="errors[0]"
            type="text"
            placeholder="E-mail" />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Password"
          vid="password"
          :rules="{ required: true, min: { length: 8 } }"
          class="">
          <base-field
            v-model="password"
            :error="errors[0]"
            type="password"
            placeholder="Password" />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Repeat password"
          :rules="{ required: true, confirmation: { target: '@password' } }"
          class="mt-xs">
          <base-field
            v-model="repeat"
            :error="errors[0]"
            type="password"
            placeholder="Repeat password" />
        </validation-provider>
        <base-button
          type="submit"
          :text="isLoading ? 'Loading' : 'Register'"
          class="register-btn"
          :icon="isLoading ? 'fa fa-spinner fa-spin' : null"
          primary
          rounded />
      </form>
    </validation-observer>
    <div v-if="message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapActions } from 'vuex';

export default {
  name: 'register',
  data: () => ({
    email: '',
    username: '',
    password: '',
    repeat: '',
    message: '',
    isLoading: false
  }),
  methods: {
    ...mapActions('user', ['setToken']),
    register() {
      if (this.password !== this.repeatPassword) {
        this.message = 'Repeat password correctly';
      } else {
        this.isLoading = true;
        auth.register({
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.setToken(data.token);
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(({ status, data: { error } }) => {
          this.message = status >= 400 && status < 500 ? error : 'Something went wrong. Try again.';
        })
        .finally(() => {
          this.isLoading = false;
        });
      }
    }
  },
  components: {
    BaseButton,
    BaseField
  }
};
</script>

<style lang="scss">
@import "../../assets/stylesheets/_variables";

.desk-register.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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

  .register-btn {
    max-width: 100%;
  }
}

</style>
