<template>
  <div class="signin">
    
    <TopBar :iconleft="'chevron-left'"></TopBar>

    <div class="content-container">
      
      <div class="content-title">
        <a style="font-size: 40px"> Cadastro de Propriedade </a>
      </div>

      <div class="content-form">
        <TextField :color="'black'" class="mt-3" v-model="cep" :label="'CEP'"></TextField>
        <TextField :color="'black'" class="mt-3" v-model="state" :label="'Estado'"></TextField>
        <TextField :color="'black'" class="mt-3" v-model="city" :label="'Cidade'"></TextField>
        <TextField :color="'black'" class="mt-3" v-model="district" :label="'Bairro'"></TextField>
        <TextField :color="'black'" class="mt-3" v-model="street" :label="'Rua/Avenida'"></TextField>
        <TextField :color="'black'" class="mt-3" v-model="complement" :label="'Complemento'"></TextField>
      </div>

      <div class="content-button">
        <SignButton class="mt-4" :label="'Cadastrar'" @action="register"/>
      </div>
      
    </div>
  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SignButton from '../components/input/SignButton'
  import axios from "axios"
  import router from "../router"

  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
    },

    data() {
      return {
        cep: '',
        state: '',
        city: '',
        district: '',
        street: '',
        complement: '',
      }
    },

    methods: {

      register(){
        if (!this.validateInput()) {
          return
        }       
        
        let data = {
          cep: this.cep,
          state: this.state,
          city: this.city,
          district: this.district,
          street: this.street,
          complement: this.complement,
        }

        const url = 'http://0.0.0.0:8080/property/'

        axios.post(url, data)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            if(error.response.data.cep){
              this.$toasted.show(error.response.data.cep).goAway(2000)
            }
            if(error.response.data.state){
              this.$toasted.show(error.response.data.state).goAway(2000)
            }
            if(error.response.data.city){
              this.$toasted.show(error.response.data.city).goAway(2000)
            }
            if(error.response.data.district){
              this.$toasted.show(error.response.data.district).goAway(2000)
            }
            if(error.response.data.street){
              this.$toasted.show(error.response.data.street).goAway(2000)
            }
            if(error.response.data.complement){
              this.$toasted.show(error.response.data.complement).goAway(2000)
            }
          })
      },

      validateInput(){

        if (!this.cep) {
          this.$toasted.show('Insira seu CEP').goAway(2000)
          return false
        }

        if (!this.state) {
          this.$toasted.show('Selecione um estado').goAway(2000)
          return false
        }

        if (!this.city) {
          this.$toasted.show('Insira um cidade').goAway(2000)
          return false
        }

        if (!this.district) {
          this.$toasted.show('Insira um bairro').goAway(2000)
          return false
        }
        
        if (!this.street) {
          this.$toasted.show('Insira um endereço').goAway(2000)
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