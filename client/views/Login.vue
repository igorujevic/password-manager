<template>
  <div>
    <form @submit.prevent="login" class="login">
      <h1>Login in</h1>
      <label>Email</label>
      <input v-model="email" required type="email" placeholder="Name">
      <label>Password</label>
      <input v-model="password" required type="password" placeholder="Password">
      <hr>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import auth from '@/api/auth';

export default {
  data: () => ({
    email: '',
    password: '',
    message: '',
    isLoading: false
  }),
  methods: {
    login() {
      this.isLoading = true;
      auth.login({
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          this.$router.push({ name: 'Home' });
        })
        .catch(({ status, data: { error } }) => {
          this.message = status >= 400 && status < 500 ? error : 'Something went wrong. Try again.';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
