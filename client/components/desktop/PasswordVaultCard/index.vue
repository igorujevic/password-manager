<template>
  <div @click="changeState" class="password-vault-card">
    <div class="password-vault-card-header">
      <p>{{ data.name }}</p>
      <span> {{ createdAt }} </span>
      <div @click.stop="deletePasswordVault" class="delete-icon">
        <span class="fas fa-trash-alt" />
      </div>
    </div>
    <div class="password-vault-card-body">
      <div class="page-url">
        <p class="info">Page Url:</p>
        <p>{{ data.pageUrl }}</p>
        <div @click.stop="editPasswordVault" class="edit-icon">
          <span class="far fa-edit edit-icon" />
        </div>
      </div>
      <div class="password">
        <p class="info">Password:</p>
        <div>
          <p v-if="show">{{ data.password }}</p>
          <p v-else>{{ hiddenPassword }}</p>
        </div>
        <div v-show="show" @click.stop="changeState" class="icon">
          <span class="fas fa-eye-slash" />
        </div>
        <div v-show="!show" @click.stop="changeState" class="icon">
          <span class="fas fa-eye" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { convertISOToDateAndTime } from "../../../helpers/functions";
import { mapGetters } from "vuex";
import passwordVault from "@/api/passwordVault";

export default {
  name: "password-vault-card",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    hiddenPassword: "",
    show: false
  }),
  computed: {
    ...mapGetters("user", ["authToken"]),
    // a computed getter
    createdAt: function() {
      return convertISOToDateAndTime(this.data.createdAt);
    }
  },
  methods: {
    changeState() {
      if (this.show) this.show = false;
      else this.show = true;
    },
    showHidePassword() {
      if (this.show) this.show = false;
      else this.show = true;
    },
    deletePasswordVault() {
      passwordVault
        .deleteOne(this.data._id, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        .then(() => {
          this.$emit("passwordVaultDeleted", this.data._id);
          this.$notify({
            type: "success",
            text: `${this.data.name} deleted.`,
            duration: 3000
          });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: "Error while trying to delete.",
            duration: 3000
          });
        });
    },
    editPasswordVault() {
      this.$emit("editPasswordVaultId", this.data);
      this.$modal.show("edit-pv-modal");
    }
  },
  mounted() {
    this.hiddenPassword = this.hiddenPassword.padStart(
      this.data.password.length,
      "*"
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/stylesheets/_variables";

.password-vault-card {
  padding: 10px 15px;
  width: calc(100% - 30px);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 $hoverShadow;
  transition: 0.3s;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 4px 8px 0 $hoverShadow;
    cursor: pointer;
  }

  &-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    position: relative;

    p {
      width: calc(100% - 30px);
      color: $primaryFontColor;
      font-size: 24px;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      font-size: 12px;
      color: lighten($primaryFontColor, 30%);
    }

    .delete-icon {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 24px;
      color: $primaryFontColor;
      transition: 0.25s ease;

      &:hover {
        color: $error;
      }
    }
  }

  &-body {
    .page-url {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      .info {
        text-transform: uppercase;
        font-weight: 600;
        color: darken($lightGrey, 60%);
        font-size: 16px;
      }

      p:last-of-type {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .edit-icon {
        position: absolute;
        bottom: 50%;
        right: 0px;
        transform: translate(-5px, 50%);
        font-size: 24px;
        color: $primaryFontColor;
        transition: 0.25s ease;

        &:hover {
          color: $primaryColor;
        }
      }
    }

    .password {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;

      .info {
        text-transform: uppercase;
        font-weight: 600;
        color: darken($lightGrey, 60%);
        font-size: 16px;
      }

      & > div {
        display: flex;
        align-items: flex-end;

        p:first-of-type {
          color: $black;
          font-size: 20px;
        }

        p:last-of-type {
          width: calc(100% - 30px);
          word-break: break-all;
        }
      }

      .icon {
        position: absolute;
        bottom: 50%;
        right: 0;
        transform: translateY(50%);
        font-size: 24px;
        color: $primaryFontColor;
        transition: 0.25s ease;

        &:hover {
          color: $primaryColor;
        }
      }
    }
  }
}
</style>
