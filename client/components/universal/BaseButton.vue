<template>
  <button v-on="$listeners" :class="{ primary, rounded }" class="button">
    <div class="button-container">
      <span v-if="showIcon(icon)" class="icon mr-s">
        <i :class="icon"></i>
      </span>
      <span class="text">{{ text }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    showIcon(icon) {
      return !!icon;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/_variables";

.button {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  cursor: pointer;
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  border: 1px solid $primaryColor;

  .icon, .text {
    color: $primaryFontColor;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: $lightGrey;
    pointer-events: none;
    cursor: default;
  }
}
.rounded {
  border-radius: 10px;
  transition: 0.25s ease;

}
.primary {
  background-color: $primaryColor;
  transition: 0.25s ease;

  &:hover {
    background-color: $white;

    .icon, .text {
      color: $primaryColor;
    }
  }
  .icon, .text {
    transition: 0.25s ease;
    color: $white;
  }
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
