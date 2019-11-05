<template>
  <div
    class="container"
  >
    <h4>
      {{ date }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      default: "00/00",
      type: String,
    },
  }
  
}
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/colors.scss";

  .container {
    height: 150px;
    width: 285px;
    border-radius: 12px;
    background: #56A3A6;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  h4 {
    color: $color-default-text;
  }

</style>