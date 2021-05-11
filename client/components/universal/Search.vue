<template>
  <input
    :value="value"
    :placeholder="placeholder"
    class="search-bar"
    v-on="listeners"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  name: "search",
  inheritAttrs: true,
  props: {
    value: { type: String, default: "" },
    placeholder: { type: String, default: "Search..." }
  },
  computed: {
    listeners() {
      const { input, change, ...listeners } = this.$listeners;
      return listeners;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/variables";

.search-bar {
  border: none;
  border-bottom: 1px solid $primaryFontColor;
  font-size: 16px;
  color: $primaryFontColor;
  padding: 10px 5px;
  width: calc(100% - 10px);

  &:focus {
    outline: none;
  }
}
</style>
