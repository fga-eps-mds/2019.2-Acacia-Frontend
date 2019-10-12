<template>
  <div id="textfield" class="textfield-container">

    <div class="row ml-1 mr-1 centralize-div">

      <div 
        v-if="label" 
        class="col-12 p-0 textfield-label" 
        :style="'color: ' + this.color">
          {{ label }}
      </div>

      <!-- When this component is instantiated without icon it is necessary 
      to render a line to assist the user. -->
			<input 
        v-model="typed_text" 
        v-if="!texticon" 
        :type="getFieldType()" 
        :class="'text-input col-12 ' + color"
        :placeholder="placeholder"
        
      >

			<div v-else class="w-100 col p-0">

				<font-awesome-icon :icon="texticon" style="color:white"/>
        
				<input 
          v-model="typed_text" 
          style="border:none"
          :type="getFieldType()" 
          class="ml-3 text-input col-12 white" 
          :placeholder="placeholder"
          :style="'color: ' + this.color"
        >

				<!-- <div class="text-field-border"></div> -->
			</div>

    </div>
  </div>
</template>

<script>
  export default {

    props: {
      label: {
        default: "",
        type: String
      },

      placeholder: {
        default: "",
        type: String
      },

      password: {
        default: false,
        type: Boolean
      },

      texticon: {
        default: "",
        type: String
      },

      input_text: {
        type: String
      },

      color: {
        default: "white",
        type: String
      }
    },

    model: {
      prop: "input_text",
      event: "textfield-change"
    },

    computed: {
      typed_text: {
        get: function () {
          return this.input_text;
        },

        set: function (value) {
          this.$emit("textfield-change", value);
        }
      },
    },

    methods: {
      getFieldType() {
        if (this.password) {
          return "password";
        } else {
          return "text";
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/colors.scss";

  .textfield-label {
    text-align: left;
    font-size: 90%;
  }

  .textfield-container {
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
  }

  .text-input {
    background-color: rgba(7, 37, 37, 0);
    border: none;
    border-bottom: 1px solid white;
    width: 80%;
    padding: 2%;
  }

  .text-input:focus {
    outline: none;
    border-bottom-color: $color-default-text;
  }

  .text-field-border {
    height: 1px;
    width: 100%;
  }

  input {
    color: white;
  }

  /* Hidden placeholder when focus */
  input.white::-webkit-input-placeholder {
    color: #ffffff;
  }

  input.black::-webkit-input-placeholder {
    color: #000000;
  }

  input:focus::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0);
  }
</style>