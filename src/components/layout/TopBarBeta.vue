<template>
  <div
    id="topbar"
    class="navbar"
    :class="{primary, dark, seila}"
  >
    <font-awesome-icon
      v-if="iconleft"
      :icon="iconleft"
      @click="selectLeft()"
    />

    <font-awesome-icon
      v-if="iconright"
      :icon="iconright"
      @click="selectRight()"
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
      default: "",
      type: String
    },

    primary: {
      default: false,
      type: Boolean,
    },

    dark: {
      default: false,
      type: Boolean,
    },
    seila: {
      default: false,
      type: Boolean,
    },
  },

  methods: {
    selectLeft() {
      if (this.iconleft == "chevron-left") {
        this.$router.go(-1);
      } else if (this.iconleft == "bars") {
        // The sidebar feature will be implemented here
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
  }
};
</script>

<style>
  #topbar {
    padding: 5px;
  }

  .navbar{
    text-shadow: 1px 1px 1px #ccc;
    font-size: 1.3em;
    overflow: hidden;
    position: fixed;
    top: 0; 
    width: 100%; 

  }
  .primary {
    color: #376996;
  
  }
  .secundary {
    color: #56a3a6;
      
  }
  .dark {
    color: #364259;
   
  }
  .light {
    color: #f7f8fc;
    
  }
</style>