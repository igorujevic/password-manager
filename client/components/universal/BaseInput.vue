<template>
  <input
    v-on="listeners"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
    :value="value"
    :type="type"
    class="input">
</template>

<script>
export default {
  name: 'base-input',
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  computed: {
    listeners() {
      const { input, change, ...listeners } = this.$listeners;
      return listeners;
    }
  }
};
</script>
