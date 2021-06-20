<template>
  <div class="desk-account-page">
    <back-arrow />
    <h1 class="desk-account-page-title">Account page of {{firstName}} {{lastName}}</h1>
    <p class="desk-account-page-since">since: {{ createdAt }}</p>
    <div class="user-data account-page-email">
      <div class="user-data-details">
        <div>
          <p>Email:</p>
          <p>{{userEmail}}</p>
        </div>
        <div>
          <p>Name:</p>
          <p>{{firstName}} {{lastName}}</p>
        </div>
      </div>
      <base-button @click="$router.push({ name: 'UpdateUserData' })" primary rounded text="Change user data" class="account-page-edit-btn" />
    </div>
    <div class="user-data account-page-password">
      <p>Your password is safe and encrypted</p>
      <base-button @click="$router.push({ name: 'ChangePassword' })"  primary rounded text="Change password" class="account-page-edit-btn" />
    </div>
    <div class="user-data delete-account">
      <p>Saved passwords</p>
      <p v-if="loadPasswords">Loading...</p>
      <p v-else>{{allPasswords.length}}</p>
    </div>
    <div class="user-data delete-account">
      <p>Delete account</p>
      <base-button @click="deleteAccount"  error rounded text="Delete account" class="account-page-delete-btn" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import auth from "@/api/auth";
import passwordVault from "@/api/passwordVault";
import BackArrow from "../../assets/icons/BackArrow";
import BaseButton from "../../components/universal/BaseButton";
import { convertISOToDateOnly } from '../../helpers/functions';

export default {
  name: 'account',
   data: () => ({
    loadPasswords: true,
    allPasswords: []
  }),
  computed: {
    ...mapGetters("user", ["authToken"]),
    ...mapGetters('user', ['userData']),
    createdAt: function() {
      return convertISOToDateOnly(this.userData.createdAt);
    },
    firstName: function() {
      return this.userData.firstName;
    },
    lastName: function() {
      return this.userData.lastName;
    },
    userEmail: function() {
      return this.userData.email
    },
    userId: function() {
      return this.userData.userId
    }
  },
  methods: {
    ...mapActions('user', ['deleteUser']),
    deleteAccount() {
      if(confirm("Are you sure?")) {
        auth.deleteAccount(
          this.userId,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`
            }
          }
        )
        .then(() => {
          this.deleteUser();
          this.$notify({
            type: 'success',
            text: "Account deleted",
            duration: 3000
          });
          this.$router.push({ name: 'Register' })
        })
        .catch(({response: {data}}) => {
          this.$notify({
            type: 'error',
            text: data.message,
            duration: 3000
          });
        })
      }
    }
  },
  async created() {
    passwordVault
      .getAll({
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      })
      .then(({ data }) => {
        this.allPasswords = data.passwords;
      })
      .catch(() => {
        this.$notify({
          type: "error",
          text:
            "Something went wrong while loading data! Try later or contact us.",
          duration: 5000
        });
      })
      .finally(() => {
        this.loadPasswords = false;
      });
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

  .account-page-delete-btn {
    max-width: 200px;
  }
}
</style>
