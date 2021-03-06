<template>
  <div class="desk-login container">
    <h1>Login in</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(login)" class="eager form-container">
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="E-mail"
          :rules="{ required: true, email: true }"
          class="">
          <base-field
            v-model.trim="email"
            @focus="clearMessage"
            :error="errors[0]"
            type="text"
            placeholder="E-mail" />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          mode="eager"
          name="Password"
          vid="password"
          :rules="{ required: true, min: { length: 8 } }"
          class="">
          <base-field
            v-model="password"
            @focus="clearMessage"
            :error="errors[0]"
            type="password"
            class="last-input"
            placeholder="Password" />
        </validation-provider>
        <base-button
          type="submit"
          :text="isLoading ? 'Loading' : 'Login'"
          class="login-btn"
          :icon="isLoading ? 'fa fa-spinner fa-spin' : ''"
          primary
          rounded />
      </form>
    </validation-observer>
    <div v-if="message" class="login-error-message"> {{ message }} </div>
    <p class="register-message">Don't have account? Register <a href="/register">here</a>.</p>
  </div>
</template>

<script>
import auth from '@/api/auth';
import BaseButton from '../../components/universal/BaseButton';
import BaseField from '../../components/universal/BaseField';
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    message: '',
    isLoading: false
  }),
  methods: {
    ...mapActions('user', ['setToken']),
    ...mapActions('user', ['saveUserData']),
    clearMessage() {
      this.message = '';
    },
    login() {
      this.isLoading = true;
      auth.login({
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.setToken(data.token);
          this.saveUserData(data.userData);
          this.$notify({
            type: 'success',
            text: 'You are logged in.',
            duration: 3000
          });
          if(data.userData.admin) this.$router.push({ name: 'AdminDashboard' });
          else this.$router.push({ name: 'Dashboard' });
        })
        .catch(({ response: { data, status } }) => {
          this.message = status >= 400 && status < 500 ? `${data.message} Wrong email or password.` : 'Something went wrong. Try again.';
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

.desk-login.container {
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

  .login-btn {
    max-width: 100%;
  }

  .login-error-message {
    margin: 10px 0px 0px;
    color: $error;
  }

  .register-message {
    margin-top: 10px;

    a {
       text-decoration: none;
       color: $primaryColor;
     }
  }
}

</style>
