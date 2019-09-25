<template>
  <div class="signin gradient">
		<div class="col"></div>
		<h1 class="raleway-bold ">This is an sign in page</h1>
		<TextField :placeholder="'email'" class="mt-5"/>
		<TextField :placeholder="'password'" class="mt-5" :password="true"/>
		<TextField :label="'Email'" class="mt-5" />
		<TextField :label="'Password'" class="mt-5" :password="true"/>
<<<<<<< HEAD
		<TextField :placeholder="'email'" class="mt-5" :icon="'user'"/>
=======
		<SimpleButton :label="'Criar Conta'"></SimpleButton>
		<font-awesome-icon icon="arrow-left"/>
>>>>>>> d0d0b92e8a01425444147f4a3854b8f3549be555
  </div>
</template>

<script>
	import TextField from '../components/input/TextField'
	import SimpleButton from '../components/input/SimpleButton'

	export default {
		components: {
			TextField,
			SimpleButton
		}
	}
</script>

<style scoped>
	.signin {
		width: 100%;
		height: 100%;
		position: absolute;
		margin-top: 0;
		text-align: center;
	}
	.gradient {
		background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(55, 105, 150, 200));
	}
</style>