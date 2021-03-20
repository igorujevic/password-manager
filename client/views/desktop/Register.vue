<template>
  <div>
    <h1>Register</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(register)" class="register">
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
        <hr>
        <button type="submit">Register</button>
      </form>
    </validation-observer>
    <div v-if="message"> {{ message }} </div>
  </div>
</template>

<script>
import auth from '@/api/auth';
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
  },
  components: {
    BaseField
  }
};
</script>
