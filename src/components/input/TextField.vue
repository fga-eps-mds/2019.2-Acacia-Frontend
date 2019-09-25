<template>
	<div id="textfield" class="container">
		<div class="row ml-1 mr-1 centralize-div">
			<div class="text-left col-12 p-0 text-color-default">
				{{ label }}
			</div>

			<input :type="getFieldType()" class="text-input col-12" :placeholder="placeholder">
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
		placeholder: {
			default: '',
			type: String
		},
		password: {
			default: false,
			type: Boolean
		},
	},
	methods: {
		getFieldType() {
			if (this.password) {
				return 'password'
			} else {
				return 'text'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/colors.scss";

.text-input {
	background-color: rgba(7, 37, 37,0 );
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1 !important; 
	border-bottom-color: '#bbbbbb';
	width: 80%;
	padding: 1%;
	color: $color-default-text;
}
::placeholder {
	color: $color-default-text;
}

.text-input:focus {
	outline: none;
	border-bottom-color: $color-default-text;
}
</style>