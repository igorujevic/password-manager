<template>
  <div>
    <h1>Login in</h1>
    <form @submit.prevent="handleSubmit(login)" class="login">
      <base-field
        v-model.trim="email"
        @focus="clearMessage"
        type="email"
        placeholder="Email" />
      <base-field
        v-model.trim="password"
        @focus="clearMessage"
        type="password"
        placeholder="Password" />
      <hr>
      <button type="submit">Login</button>
    </form>
    <div v-if="message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
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
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(({ status, data: { error } }) => {
          this.message = status >= 400 && status < 500 ? error : 'Something went wrong. Try again.';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  components: {
    BaseField
  }
};
</script>
