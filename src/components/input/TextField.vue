<template>
	<div id="textfield" class="textfield-container">
		<div class="row ml-1 mr-1 centralize-div">
			<div v-if="label" class="col-12 p-0 text-color-default textfield-label" :style="componentStyle">{{ label }}</div>
			<input v-model="variableLocal" v-if="!texticon" :type="getFieldType()" class="text-input col-12" :placeholder="placeholder" :style="componentStyle">
			<div v-else class="w-100 col p-0">
				<font-awesome-icon :icon="texticon" style="color:white"/>
				<input v-model="variableLocal" :type="getFieldType()" class=" ml-3 text-input col-12" style="border:none" :placeholder="placeholder">
				<div class="text-field-border"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
		password: {
			default: false,
			type: Boolean
		},
		texticon: {
			default: '',
			type: String
		},
		variable: {
			type: String
		},
	},
	model: {
		prop: 'variable',
		event: 'textfield-change'
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
		getFieldType() {
			if (this.password) {
				return 'password'
			} else {
				return 'text'
			}
		},
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
		color: $color-default-text;
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
	input::-webkit-input-placeholder {
		color: #ffffff;
	}
	input:focus::-webkit-input-placeholder {
		color: rgba(0,0,0,0);
	}
	/* Firefox < 19 */
	input:-moz-placeholder {
		color: #ffffff;
	}
	input:focus:-moz-placeholder {
		color: rgba(0,0,0,0);
	}
	/* Firefox > 19 */
	input::-moz-placeholder {
		color: #ffffff;
	}
	input:focus::-moz-placeholder {
		color: rgba(0,0,0,0);
	}

	/* Internet Explorer 10 */
	input:-ms-input-placeholder {
		color: #ffffff;
	}
	input:focus:-ms-input-placeholder {
		color: rgba(0,0,0,0);
	}
</style>