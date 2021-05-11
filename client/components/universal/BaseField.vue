<template>
  <div class="base-field-container">
    <div class="input-container" :class="{ focused: focused || hasValue }">
      <label> {{ placeholder }} </label>
      <slot>
        <base-input
          @focus="focused = true"
          @blur="focused = false"
          @click="focused = true"
          @input="getValue"
          v-on="$listeners"
          v-bind="$attrs"
          :type="type"
          class="stretch"
        />
      </slot>
    </div>
    <span v-show="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
import BaseInput from "./BaseInput";

export default {
  name: "base-field",
  inheritAttrs: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    rounded: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data: () => ({
    focused: false,
    hasValue: false
  }),
  methods: {
    getValue(value) {
      if (value) this.hasValue = true;
      else this.hasValue = false;
    }
  },
  components: { BaseInput }
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/_variables";

.base-field-container {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-width: 500px;
  margin-bottom: 15px;

  .input-container {
    display: flex;
    flex-direction: column;
    width: calc(100% - 20px);
    height: calc(50px - 10px);
    min-height: 40px;
    border: 1px solid $primaryColorDarker;
    border-radius: 10px;
    padding: 5px 10px;
    margin-bottom: 5px;
    transition: 0.25s ease;
    position: relative;

    &:focus {
      label {
        transform: scale(0.9);
      }
    }

    label {
      position: absolute;
      top: 5px;
      left: 10px;
      transition: 0.25s ease;
      color: $primaryColorDarker;
    }

    input {
      position: absolute;
      padding-top: 10px;
      height: calc(100% - 15px);
      width: calc(100% - 20px);
      background: none;
      font-size: 16px;
    }
  }

  .focused {
    label {
      font-size: 12px;
    }
  }

  .error-message {
    margin-bottom: 5px;
    color: $error;
    font-size: 14px;
  }
}
</style>
