<template>
  <div class="signin gradient">
		<TopBar :iconleft="'chevron-left'"/>
		<div class="content-container">
			<img width="45%" class="max-width-500 mb-4" src="../assets/images/logo.svg">
			<TextField class="mt-5" v-model="username_or_email" :texticon="'user'" :placeholder="'email or username'"/>
			<TextField class="mt-4" v-model="password" :texticon="'lock'" :placeholder="'password'" :password="true"/>
			<SignButton :label="'Sign in'" class="mt-5"/>
			<a href="/signup" class="mt-3 text-white" style="text-decoration:underline">Forgot your password?</a>
		</div>
		<div class="signup-button fixed-bottom">
			Create account
		</div>
	</div>
</template>

<script>
import TextField from '../components/input/TextField'
import TopBar from '../components/layout/TopBar'
import SignButton from '../components/input/SignButton'
export default {
	components: {
		TextField,
		TopBar,
		SignButton
	},
	data() {
		return {
			username_or_email: '',
			password: ''
		}
	},
}
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

	.max-width-500 {
		max-width: 400px;
	}
	.signup-button {
		margin: auto;
		height: 6%;
		width: 100%;
		background-color: $color-primary;
		margin-bottom: 0;
		position: absolute;
		color: $color-default-text;
		font-family: RobotoBold;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 130%;
	}
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.signin {
		width: 100%;
		height: 100%;
		position: absolute;
		margin-top: 0;
		text-align: center;
	}
	.gradient {
		background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75s, 125, 170, 105));
	}
</style>