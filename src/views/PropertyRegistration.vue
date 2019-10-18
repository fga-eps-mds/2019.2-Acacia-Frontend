
<template>
  <div class="property-form gradient">
    <TopBar :iconleft="'chevron-left'"/>
    
    <div class="content-container">

      <div class="content-title">
        <h2> Registrar propriedade</h2>
      </div>

      <div class="content-form">
        
        <TextField 
          class="mt-3" 
          v-model="brzipcode" 
          :label="'CEP'" 
        />
        <TextField 
          class="mt-3" 
          v-model="state" 
          :label="'Estado'" 
        />
        <TextField 
          class="mt-3" 
          v-model="city" 
          :label="'Cidade'" 
        />
        <TextField 
          class="mt-3" 
          v-model="district" 
          :label="'Bairro'" 
        />
        <TextField 
          class="mt-3" 
          v-model="street" 
          :label="'Rua / Avenida'" 
        />
        <TextField 
          class="mt-3" 
          v-model="complement" 
          :label="'Complemento'" 
        />        
      
      </div>

      <div class="content-button">
        <SignButton class="mt-4" :label="'Cadastrar propriedade'" @action="registerProperty"/>
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
        brzipcode: '',
        state: '',
        city: '',
        district: '',
        street: '',
        complement: '',
      }
    },

    methods: {
      registerProperty(){
        if (!this.validateInput()) {
          return
        }       
        
        let data = {
          brzipcode: this.brzipcode,
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
            if(error.response.data.brzipcode){
              this.$toasted.show(error.response.data.brzipcode).goAway(2000)
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
        if (!this.brzipcode) {
          this.$toasted.show('Insira seu CEP').goAway(2000)
          return false
        }

        if (!this.state) {
          this.$toasted.show('Selecione um estado').goAway(2000)
          return false
        }

        if (!this.city) {
          this.$toasted.show('Insira uma cidade').goAway(2000)
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
      },
    }
  }

</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";
  
  .property-form {
    width: 100%;
    height: 100%;
    position: absolute;
    margin-top: 0;
    text-align: center;
  }
	.gradient {
		background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75s, 125, 170, 105));
	}

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .content-form {

  }

  .content-title {
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 20%;
    color: $color-default-text;
    display: flex;
    justify-content: left; 
  }


  .content-button {
    margin-top: 20px;
  }

</style>