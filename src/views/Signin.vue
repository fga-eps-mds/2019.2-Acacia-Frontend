<template>
  <div class="signin gradient">
		<div class="col"></div>
		<h1 class="raleway-bold ">This is an sign in page</h1>
		<TextField v-model="username" :placeholder="'email'" class="mt-5" :texticon="'user'"/>
		<TextField v-model="password" :placeholder="'password'" class="mt-5" :texticon="'lock'" :password="true"/>
		<SimpleButton :label="'Criar Conta'" class="mt-5"/>
		<div class="bg-dark text-white"><p> Username: {{ username }} </p> <p> Password: {{ password }} </p> </div>
  </div>
</template>

<script>
	import TextField from '../components/input/TextField'
	import SimpleButton from '../components/input/SimpleButton'

	export default {
		components: {
			TextField,
			SimpleButton
		},
		data() {
			return {
				username: 'joaocleber',
				password: 'batata'
			}
		},
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