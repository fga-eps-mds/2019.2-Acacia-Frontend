<template>
  <div class="signup gradient">
    <TopBar :iconleft="'chevron-left'"></TopBar>
    <div class="content-container">
      <div class="content-title">
        <a style="font-size: 40px"> Criar conta </a>
      </div>
      <div class="content-form">
        <TextField class="mt-3" v-model="username" :label="'Nome'"></TextField>
        <TextField class="mt-3" v-model="email" :label="'Email'"></TextField>
        <TextField class="mt-3" v-model="password" :label="'Senha'" :password="true"></TextField>
        <TextField class="mt-3" v-model="confirm_password" :label="'Confirme a senha'" :password="true"></TextField>
      </div>
      <div class="content-button">
        <SignButton class="mt-4" :label="'Criar conta'" @action="signup"/>
      </div>
    </div>

  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SignButton from '../components/input/SignButton'
  import axios from "axios"

  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
    },
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      }
    },
    methods: {
      signup(){
        if (!this.validateInput()) {
          return
        }       
        
        let data = {
          email: this.email,
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password
        }

        const url = 'http://0.0.0.0:8080/users/signup/'
        axios.post(url, data)
          .then((response) => {
            
            })
          .catch((error) => {
            if(error.response.data.email){
              this.$toasted.show(error.response.data.email).goAway(2000)
            }
              if(error.response.data.username){
                this.$toasted.show(error.response.data.username).goAway(2000)
            }
            if(error.response.data.password){
              this.$toasted.show(error.response.data.password).goAway(2000)
            }
            
          })
      },
      validateInput(){
        if (!this.username) {
          this.$toasted.show('Insira seu nome').goAway(2000)
          return false
        }

        if (!this.email) {
          this.$toasted.show('Insira um email').goAway(2000)
          return false
        }

        if (!this.password) {
          this.$toasted.show('Insira uma senha').goAway(2000)
          return false
        }

        if (this.password.length < 8) {
          this.$toasted.show('Insira uma senha maior que 8 caracteres').goAway(2000)
          return false
        }
        
        if (this.confirm_password != this.password) {
          this.$toasted.show('As senhas devem corresponder').goAway(2000)
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

<style lang="scss" scoped>
  @import "../assets/stylesheets/colors.scss";

  .content-button {
    margin-top: 90px;
  }

  .content-title {
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 20%;
    color: $color-default-text;
    display: flex;
    justify-content: left; 
  }
  
  .content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

  .signup {
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