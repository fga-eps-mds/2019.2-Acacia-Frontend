<template>
  <div class="signin gradient" v-on:keydown.enter="login">
		<TopBar :iconleft="'chevron-left'"/>
		<div class="content-container">
			<img width="45%" class="max-width-500 mb-4" src="../assets/images/logo.svg">
			<TextField class="mt-5" v-model="email" :texticon="'user'" :placeholder="'email'"/>
			<TextField class="mt-5" v-model="password" :texticon="'lock'" :placeholder="'password'" :password="true"/>
			<SignButton :label="'Sign in'" class="mt-5" @action="login"/>
			<a href="/forgotten-password" class="mt-3 text-white" style="text-decoration:underline">Forgot your password?</a>
      <!-- <div class="container">
        <p style="font-size: 10px">Access token: {{ this.$store.getters.getAccessToken }}</p>
        <p style="font-size: 10px">Refresh token: {{ this.$store.getters.getRefreshToken }}</p>
      </div> -->
    </div>
		<div href="/signup" class="signup-button fixed-bottom">
			<a href="/signup" class="button-link">
        Create account
      </a>
		</div>

	</div>
</template>

<script>
/* Component imports */
import TextField from '../components/input/TextField'
import TopBar from '../components/layout/TopBar'
import SignButton from '../components/input/SignButton'

/* Library imports */
import axios from "axios"

/* Basic scripts imports */
import router from '../router'

export default {
	components: {
		TextField,
		TopBar,
		SignButton
	},
	data() {
		return {
			email: '',
			password: ''
		}
	},
  methods: {
    login() {
      if (!this.email) {
        this.$toasted.show('Provide an email').goAway(2000)
        return
      }
      if (!this.password) {
        this.$toasted.show('Provide a password').goAway(2000)
        return
      }

      let data = {
        email: this.email,
        password: this.password
      }

      axios.post("http://0.0.0.0:8080/users/token/", data)
        .then((response) => {
          if (response.status == '200') {
            this.$toasted.show('Logged in!').goAway(2000)
            let tokenData = {
              accessToken: response.data['access'],
              refreshToken: response.data['refresh']
            }
            this.$store.commit('authUser', tokenData);
            router.push({name: 'home'})
          } else {
            this.$toasted.show('An error has occurred, try again').goAway(2000)
          }
        })
        .catch ((errors) => {
          this.$toasted.show('Email or password is incorrect').goAway(2000)
        })
    }
  }
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
  .button-link {
    color: $color-default-text;
		font-family: RobotoBold;
    font-size: 130%;
    text-decoration: none;
  }
	.gradient {
		background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75s, 125, 170, 105));
	}
</style>