<template>
  <div @click="changeState" class="password-vault-card">
    <div class="password-vault-card-header">
      <p> {{ data.name }} </p>
      <span> {{ createdAt }} </span>
    </div>
    <div class="password-vault-card-body">
      <div class="page-url">
        <p class="info">Page Url:</p>
        <p> {{ data.pageUrl }} </p>
      </div>
      <div class="password">
        <p class="info">Password:</p>
        <div>
          <p v-if="show"> {{ data.password }} </p>
          <p v-else> {{ hiddenPassword }} </p>
        </div>
        <div v-show="show" @click.stop="changeState" class="icon">
          <span class="fas fa-eye-slash"></span>
        </div>
        <div v-show="!show" @click.stop="changeState" class="icon">
          <span class="fas fa-eye"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { convertISOToDate } from '../../../helpers/functions';

export default {
  name: 'password-vault-card',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    hiddenPassword: '',
    show: false
  }),
  computed: {
    // a computed getter
    createdAt: function () {
      return convertISOToDate(this.data.createdAt);
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
    }
  },
  mounted() {
    this.hiddenPassword = this.hiddenPassword.padStart(this.data.password.length, '*');
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/_variables';

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
    width: fit-content;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    P {
      color: $primaryFontColor;
      font-size: 24px;
      margin-bottom: 5px;
    }

    span {
      font-size: 12px;
      color:  lighten($primaryFontColor, 30%) ;
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
    }

    .password {
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
