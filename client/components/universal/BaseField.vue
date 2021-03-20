<template>
  <div>
    <div>
      <label> {{ placeholder }} </label>
      <slot><base-input v-on="$listeners" v-bind="$attrs" :type="type" class="stretch" /></slot>
    </div>
    <span class="error-message px-s">{{ error }}</span>
  </div>
</template>

<script>
import BaseInput from './BaseInput';

export default {
  name: 'base-field',
  inheritAttrs: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data: () => ({
  }),
  components: { BaseInput }
};
</script>
