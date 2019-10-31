<template>
  <div
    id="topbar"
    class="navbar fixed-top"
  >
    <font-awesome-icon
      v-if="iconleft"
      v-show="!iconDislay"
      :icon="iconleft"
      :class="color"
      @click="selectLeft"
    />
    <font-awesome-icon
      v-if="iconright"
      :icon="iconright"
      :class="color"
      @click="selectRight"
    />
  </div>
</template>

<script>
export default {
  props: {
    iconleft: {
      default: "",
      type: String
    },
    iconright: {
      default: '',
      type: String
    },
    color:{
      default: 'color-default-text',
      type: String
    },
  },

  methods: {
    selectLeft() {
      if (this.iconleft == "chevron-left") {
        this.$router.go(-1);
      } else if (this.iconleft == "bars") {
        this.$store.state.sideBarOn = true
      }
    },
    selectRight() {
      if (this.iconright == "pen") {
        // The edit feature will be implemented here
      } else if (this.iconright == "comment-alt") {
        // The chat feature will be implemented here
      } else if (this.iconright == "plus") {
        // The add feature will be implemented here
      }
    }
  },

  computed: {
    iconDislay: {
      get: function() {
        return this.$store.state.sideBarOn
      },
      set: function(value) {
      },
    }
  }
};
</script>
<style lang="scss" scoped>    
    @import '@/assets/stylesheets/colors.scss';
    #topbar {
        padding: 15px;
        z-index: 100 !important;
    }
    .color-primary {
        color: $color-primary;
    }
    .color-primary-dark {
        color: $color-primary-dark;
    }
    .color-default-text {
        color: $color-default-text;
    }
    .color-primary {
        color: $color-primary;
    }
    .color-primary-dark {
        color: $color-primary-dark;
    }
    .color-default-text {
        color: $color-default-text;
    }
    .pink {
        color: pink;
    }
</style>