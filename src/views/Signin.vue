<template>
  <div class="signin gradient">
		<TopBar :iconleft="'chevron-left'"/>
		<div class="content-container">
			<img width="45%" class="max-width-500 mb-4" src="../assets/images/logo.svg">
			<TextField class="mt-5" v-model="email" :texticon="'user'" :placeholder="'email'"/>
			<TextField class="mt-5" v-model="password" :texticon="'lock'" :placeholder="'senha'" :password="true"/>
			<SignButton :label="'Entrar'" class="mt-5" @action="login"/>
      <!-- <div class="container">
        <p style="font-size: 10px">Access token: {{ this.$store.getters.getAccessToken }}</p>
        <p style="font-size: 10px">Refresh token: {{ this.$store.getters.getRefreshToken }}</p>
      </div> -->
    </div>
		<div href="/signup" class="signup-button fixed-bottom">
			<a href="/signup" class="button-link">
        Criar conta
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
      if (!this.validateInput()) {
        return
      }

      let data = {
        email: this.email,
        password: this.password
      }
      //Teste (remover)
      const dotenv = require('dotenv');
      dotenv.config();
      console.log("ENV3:::::::::::::")
      console.log(process.env)
      //Fim teste
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
            this.$toasted.show('Algum erro ocorreu, tente de novo').goAway(2000)
          }
        })
        .catch ((errors) => {
          this.$toasted.show('Email ou senha está incorreto').goAway(2000)
        })
    },
    validateInput() {
      if (!this.email) {
        this.$toasted.show('Digite um email').goAway(2000)
        return false
      }
      if (!this.password) {
        this.$toasted.show('Digite uma senha').goAway(2000)
        return false
      }
      if (this.password.length < 8) {
        this.$toasted.show('Digite uma senha maior que 8 caracteres').goAway(2000)
        return false
      }
      let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
      if (!this.email.match(emailRegex)) {
        this.$toasted.show('Email digitado não é válido').goAway(2000)
        return false
      }
      return true
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
