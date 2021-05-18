<template>
  <div class="desk-admin-page">
    <h1>Admin page</h1>
    <div v-if="loading" class="no-content-wrapper">
        <loader />
    </div>
    <div v-else class="desk-admin-page-content">
      <ul class="user-list">
        <li v-for="user in users" :key="user._id" >
          <div>
            <p> username: {{user.username}} </p>
            <p> email: {{user.email}} </p>
            <p> since: {{getDate(user.createdAt)}} </p>
          </div>
          <div @click.stop="deleteUser(user._id)" class="delete-icon">
            <span class="fas fa-trash-alt" />
          </div>
        </li>
      </ul>
      <div>
        Total saved passwords: {{passwords.length}}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/api/auth";
import passwordVault from "@/api/passwordVault";
import Loader from "../../components/universal/Loader";
import { convertISOToDateAndTime } from "../../helpers/functions";
import { mapGetters } from 'vuex';
import { remove } from "lodash";

export default {
  name: 'account',
  data: () => ({
    loading: true,
    users: [],
    passwords: []
  }),
  computed: {
    ...mapGetters('user', ['authToken'])
  },
  methods: {
    getDate(data) {
      return convertISOToDateAndTime(data)
    },
    deleteUser(id) {
      if(confirm('Are you sure?')) {
        auth.deleteUser(id, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        }).then(({data}) => {
          this.users = remove(this.users, n => n._id !== id);
          this.$notify({
            type: "success",
            text: data.message,
            duration: 3000
          })
        }).catch(({response: {data}}) => {
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
    this.loading = true;
    auth
      .getAllUsers({
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      })
      .then(({data}) => {
        this.users = data.users.filter(user => !user.admin);

        passwordVault.getAllAdmin({
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        }).then(({data}) => {
          this.passwords = data.passwords
        }).catch(() => {
          this.$notify({
            type: 'error',
            text: 'Something went wrong while trying to get data',
            duration: 3000
          })
        }).finally(() => {
          this.loading = false
        });
      })
      .catch(() => {
        this.$notify({
          type: 'error',
          text: 'Something went wrong while trying to get data.',
          duration: 3000
        });
      })
  },
  components: {
    Loader
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/_variables';

.desk-admin-page {
  width: calc(100% - 160px);
  min-height: 80vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 80px 40px;
  position: relative;
  color: #222222;

  .no-content-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  h1 {
    margin-bottom: 20px;
  }

  .user-list {
    margin-bottom: 20px;
    overflow-y: scroll;
    padding: 5px;
    width: calc(100% - 10px);
    max-height: 500px;

    li {
      padding: 5px;
      display: flex;
      align-items: center;
      width: fit-content;
      box-shadow: 0 2px 4px 0 $hoverShadow;
      transition: 0.3s;
      border-radius: 10px;

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }

      &:hover {
        box-shadow: 0 4px 8px 0 $hoverShadow;
        cursor: pointer;
      }

      div:first-of-type {
        margin-right: 25px;

        p:not(:last-of-type) {
          margin-bottom: 5px;
        }
      }

      .delete-icon {
        font-size: 24px;
        transition: 0.25s ease;
        cursor: pointer;

        &:hover {
          color: $error;
        }
      }
    }
  }
}
</style>
