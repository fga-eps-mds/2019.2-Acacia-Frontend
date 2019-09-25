<template>
	<div id="textfield" class="container">
		<div class="row ml-1 mr-1 centralize-div">
			<div v-if="label" class="text-left col-12 p-0 text-color-default">{{ label }}</div>
			<input  v-if="!icon" :type="getFieldType()" class="text-input col-12" :placeholder="placeholder">
			<div v-else class="w-100 col p-0">
				<i :class="'fas fa-' + icon" style="color:white"></i>
				<input :type="getFieldType()" class=" ml-3 text-input col-12" style="border:none" :placeholder="placeholder">
				<div class="text-field-border"></div>
			</div>
<<<<<<< HEAD
=======

			<input :type="getFieldType()" class="text-input col-12" :placeholder="placeholder">
>>>>>>> d0d0b92e8a01425444147f4a3854b8f3549be555
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
		icon: {
			default: '',
			type: String
		}
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
	border-bottom: 2;
	border-bottom-color: #eeeeee;
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

.text-field-border {
	height: 2px;
	width: 100%;
	background-color: #eeeeee;
}
</style>