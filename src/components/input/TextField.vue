<template>
	<div 
    id="textfield"
    class="textfield-container">
		<div class="row ml-1 mr-1">
			<div 
				v-if="label" 
				class="col-12 p-0 text-color-default textfield-label" 
				:style="componentStyle"
      >
        {{ label }}
			</div>
			<input 
				v-model="variableLocal" 
				v-if="!texticon" 
				:type="type" 
				:class="{
					'text-input' : true, 
					'col-12': true, 
					'black-placeholder': placeholderBlack, 
					'white-placeholder': !placeholderBlack}" 
				:placeholder="placeholder" 
				:style="componentStyle">
			<div 	
				v-else 
				class="w-100 col p-0">
				<font-awesome-icon 
					:icon="texticon" 
					style="color:white"/>
				<input 
					v-model="variableLocal" 
					:type="type"
					:class="{
						'ml-3': true, 
						'text-input' : true, 
						'col-12': true, 
						'black-placeholder': placeholderBlack, 
						'white-placeholder': !placeholderBlack}" 
					style="border:none" 
					:placeholder="placeholder">
				<div class="text-field-border"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  model: {
		prop: 'variable',
		event: 'textfield-change'
	},
	props: {
		label: {
			default: '',
			type: String
		},
		color: {
			default: '',
			type: String
		},  
		placeholder: {
			default: '',
			type: String
		},
		type: {
			default: 'text',
			type: String
		},
		texticon: {
			default: '',
			type: String
		},
		variable: {
			type: String
    },
    placeholderBlack: {
      type: Boolean,
      default: false
    }
	},
	computed: {
		variableLocal: {
			get: function() {
					return this.variable
			},
			set: function(value) {
					this.$emit('textfield-change', value)
			}
		},
		componentStyle() { 	
			let componentColor = `color:${this.color}; border-color:${this.color};`
			return componentColor
		}
	},
	methods: {
	}
}
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
  background-color: rgba(7, 37, 37,0 );
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid; 
  border-bottom-color: '#bbbbbb';
  width: 80%;
  padding: 1%;
}

.text-input:focus {
  outline: none;
  border-bottom-color: $color-default-text;
}

.text-field-border {
  height: 1px;
  width: 100%;
  background-color: #ffffff;
}

/* Hidden placeholder when focus */
input.white-placeholder::-webkit-input-placeholder {
  color: #ffffff;
}
input.black-placeholder::-webkit-input-placeholder {
  color: #949090;
}
input:focus::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0);
}
/* Firefox < 19 */
input:-moz-placeholder {
  color: #ffffff;
}
input:focus:-moz-placeholder {
  color: rgba(0, 0, 0, 0);
}
/* Firefox > 19 */
input::-moz-placeholder {
  color: #ffffff;
}
input:focus::-moz-placeholder {
  color: rgba(0, 0, 0, 0);
}

/* Internet Explorer 10 */
input:-ms-input-placeholder {
  color: #ffffff;
}
input:focus:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0);
}
</style>