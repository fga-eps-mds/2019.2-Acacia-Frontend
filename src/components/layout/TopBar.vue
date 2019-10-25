<template>
  <div 
    id="topbar" 
    class="navbar fixed-top"
  >
    <div v-if="color == 'white'">
      <font-awesome-icon 
        v-if="iconleft" 
        :icon="iconleft" 
        style="color: white;"
        @click="selectLeft()" 
      />

      <font-awesome-icon 
        v-if="iconright" 
        :icon="iconright" 
        style="color: white;"
        @click="selectRight()" 
      />
    </div>

    <div v-else>
      <font-awesome-icon 
        v-if="iconleft" 
        :icon="iconleft" 
        style="color: #2D9CDB;"
        @click="selectLeft()" 
      />

      <font-awesome-icon 
        v-if="iconright" 
        :icon="iconright" 
        style="color: #2D9CDB;"
        @click="selectRight()" 
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      iconleft: {
        default: '',
        type: String
      },

      iconright: {
        default: '',
        type: String
      },

      color: {
        default: "white",
        type: String
      }
    },

    methods: {
      selectLeft() {
        if (this.iconleft == 'chevron-left') {
          this.$router.go(-1)
        } else if (this.iconleft == 'bars') {
          // The sidebar feature will be implemented here
        }
      },

      selectRight() {
        if (this.iconright == 'pen') {
          // The edit feature will be implemented here
        } else if (this.iconright == 'comment-alt') {
          // The chat feature will be implemented here
        } else if (this.iconright == 'plus') {
          // The add feature will be implemented here
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  #topbar {
    padding: 15px;
  }
</style>