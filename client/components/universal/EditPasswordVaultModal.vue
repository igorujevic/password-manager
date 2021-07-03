<template>
  <modal name="edit-pv-modal" classes="pv-modal" :click-to-close="false">
    <div class="edit-content">
      <div class="edit-content-header">
        <h2>Edit Password Vault</h2>
        <div @click="closeModal">
          <span class="far fa-times-circle fa-2x close-edit-btn" />
        </div>
      </div>
      <validation-observer v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(editPasswordVault)"
          class="eager form-container"
        >
          <validation-provider
            v-slot="{ errors }"
            name="PageUrl"
            mode="eager"
            :rules="{ required: true, url: true }"
            class=""
          >
            <base-field
              v-model.trim="url"
              :error="errors[0]"
              type="text"
              placeholder="PageUrl"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            mode="eager"
            :rules="{ required: true }"
            class=""
          >
            <base-field
              v-model="name"
              :error="errors[0]"
              type="text"
              placeholder="Name"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            mode="eager"
            :rules="{ required: true, min: { length: 8 } }"
            class="mt-xs"
          >
            <base-field
              v-model="psw"
              :error="errors[0]"
              type="password"
              placeholder="Password"
            />
          </validation-provider>
          <base-button
            type="submit"
            :text="isLoading ? 'Loading' : 'Update'"
            class="create-pv-btn"
            :icon="isLoading ? 'fa fa-spinner fa-spin' : null"
            primary
            rounded
          />
        </form>
      </validation-observer>
      <div v-if="message">{{ message }}</div>
    </div>
  </modal>
</template>

<script>
// @ is an alias to /src
import BaseButton from "../../components/universal/BaseButton";
import BaseField from "../../components/universal/BaseField";
import { mapGetters } from "vuex";
import passwordVault from "@/api/passwordVault";

export default {
  name: "edit-password-vault-modal",
  props: {
    pv: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isLoading: false,
    message: "",
    url: "",
    psw: "",
    name: ""
  }),
  computed: {
    ...mapGetters("user", ["authToken"])
  },
  methods: {
    editPasswordVault() {
      this.isLoading = true;
      passwordVault
        .update(
          this.pv._id,
          {
            pageUrl: this.url,
            name: this.name,
            password: this.psw
          },
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`
            }
          }
        )
        .then(({ data }) => {
          this.$emit("passwordVaultEdited", {
            _id: data.updatedPasswordVault._id,
            pageUrl: this.url,
            name: this.name,
            password: this.psw
          });
          this.$notify({
            type: "success",
            text: `${data.message} (${this.pv.name})`,
            duration: 3000
          });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: "Something went wrong! Try later.",
            duration: 3000
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.$modal.hide("edit-pv-modal");
        });
    },
    closeModal() {
      this.$modal.hide("edit-pv-modal");
      this.name = this.pv.name;
      this.url = this.pv.pageUrl;
      this.psw = this.pv.password;
    }
  },
  watch: {
    pv() {
      if(this.pv) {
        this.name = this.pv.name;
        this.url = this.pv.pageUrl;
        this.psw = this.pv.password;
      }
    }
  },
  components: {
    BaseButton,
    BaseField
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/variables";
@import "@/assets/stylesheets/animations";

.edit-content {
  max-width: 600px;
  width: 100%;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .close-edit-btn {
      color: $primaryColor;
      cursor: pointer;
      transition: 0.25s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .form-container {
    width: 100%;

    .base-field-container {
      max-width: 600px !important;
      width: 100%;
    }
  }
}
</style>
