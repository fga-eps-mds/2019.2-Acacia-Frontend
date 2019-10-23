<template>
  <div id="selectfield" class="selectfield-container">
    <div class="row ml-1 mr-1 centralize-div">    
      <div 
        v-if="label" 
        class="col-12 p-0 selectfield-label" 
        :style="'color: ' + this.color">
          {{ label }}
      </div>

      <select
        v-model="selected_text"
        class="text-select col-12"
        :style="'border-bottom: 1px solid ' + this.bordercolor + ';' 
                + 'color: ' + this.color + ';'"
      >
        <option 
        v-for="item in items"
        :key="item.id"> 
          {{ item.name }} 
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        default: "",
        type: String,
      },

      color: {
        default: "#8B8888",
        type: String,
      },

      bordercolor: {
        default: "#C4C4C4",
        type: String
      },

      selected: {
        type: String,
      },

      items: {
        default: [],
        type: Array,
      }
    },

    model: {
      prop: "selected",
      event: "selectfield-change",
    },

    computed: {
      selected_text: {
        get: function() {
          return this.selected;
        },

        set: function(value) {
          this.$emit("selectfield-change", value);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/colors.scss";

  .selectfield-container {
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
  }

  .selectfield-label {
    text-align: left;
    font-size: 90%;
  }

  .text-select {
    background-color: rgba(7, 37, 37, 0);
    border: none;
    width: 80%;
    padding: 2%;
  }

  .text-select:focus {
    outline: none;
    border-bottom-color: $color-default-text;
  }

  select {
    -webkit-appearance: none;
  }
</style>