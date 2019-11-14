<template>
  <div
    id="signbutton"
    :class="'container ' + direction"
  >
    <button
      :style="buttonstyle"
      :class="color + ' ' + padding"
      @click="$emit('action')"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SignButton",
  props: {
      label: {
          default: '',
          type: String
      },
      buttonstyle: {
          default: '',
          type: String
      },
      color: {
          default: 'primary-blue',
          type: String
      },
      padding: {
          default: 'big',
          type: String
      },
      direction: {
          default: '',
          type: String
      }
  },
}
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";

    button{
        background-color: $color-primary;
        padding: 8px 65px;
        font-size: 120%;

        font-family: RalewayBold;
        color: $color-default-text;
        border: none;
        border-radius: 12px;
        margin: 10px;
        box-shadow: 0 2px 3px 0.5px $color-shadow;
        outline: none;

    }
    button:active{
        box-shadow: none;
        border: none;
        margin: 10px 9px 9px 10px;
    }

</style>
