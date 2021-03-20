<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register" class="register">
      <label>Username</label>
      <input v-model="username" required type="text" placeholder="Username">
      <label>Email</label>
      <input v-model="email" required type="email" placeholder="Name">
      <label>Password</label>
      <input v-model="password" required type="password" placeholder="Password">
      <label>Password</label>
      <input v-model="repeatPassword" required type="password" placeholder="Repeat password">
      <hr>
      <button type="submit">Register</button>
    </form>
    <div v-if="message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
import { mapActions } from 'vuex';

export default {
  name: 'register',
  data: () => ({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
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
          console.log(data);
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
  }
};
</script>
