<template>
  <div class="desk-account-page">
    <back-arrow />
    <h1 class="desk-account-page-title">Account page of {{userName}}</h1>
    <p class="desk-account-page-since">since: {{ createdAt }}</p>
    <div class="user-data account-page-email">
      <div class="user-data-details">
        <div>
          <p>Email:</p>
          <p>{{userEmail}}</p>
        </div>
        <div>
          <p>Username:</p>
          <p>{{userName}}</p>
        </div>
      </div>
      <base-button @click="$router.push({ name: 'UpdateUserData' })" primary rounded text="Change email or username" class="account-page-edit-btn" />
    </div>
    <div class="user-data account-page-password">
      <p>Your password is safe and encrypted</p>
      <base-button @click="$router.push({ name: 'ChangePassword' })"  primary rounded text="Change password" class="account-page-edit-btn" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BackArrow from "../../assets/icons/BackArrow";
import BaseButton from "../../components/universal/BaseButton";
import { convertISOToDateOnly } from '../../helpers/functions';
import { mapGetters } from 'vuex';

export default {
  name: 'account',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['userData']),
    createdAt: function() {
      return convertISOToDateOnly(this.userData.createdAt);
    },
    userName: function() {
      return this.userData.username;
    },
    userEmail: function() {
      return this.userData.email
    }
  },
  methods: {
  },
  async created() {
  },
  components: {
    BackArrow,
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.desk-account-page {
  width: calc(100% - 160px);
  min-height: 90vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 80px 40px;
  position: relative;
  color: #222222;

  .back-arrow-icon {
    margin-bottom: 20px;
  }

  &-title {
    margin-bottom: 20px;
  }

  &-since {
    color: $darkGrey;
    margin-bottom: 20px;
  }

  .user-data {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;



    &-details {
      display: flex;
      min-width: 300px;
      margin-bottom: 10px;

      div {
        margin-right: 50px;
      }

    }

    p {
      &:first-of-type {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 10px;
      }
    }

    .account-page-edit-btn {
      max-width: 200px;
    }

    &.account-page-password {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
