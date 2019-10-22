
<template>
  <div class="property-form">
    
    <TopBar :iconleft="'chevron-left'" color="#2D9CDB"/>
    
    <div class="content-container">

      <div class="content-title">
        <h3> Cadastrar propriedade </h3>
      </div>

      <div class="content-form">
        
        <TextField 
          class="mt-3" 
          v-model="brzipcode" 
          :label="'CEP'"
          color="black"
          bordercolor="#C4C4C4" 
        />
        <TextField 
          class="mt-3" 
          v-model="state" 
          :label="'Estado'" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="city" 
          :label="'Cidade'" 
          color="black"
          bordercolor="#C4C4C4" 
        />
        <TextField 
          class="mt-3" 
          v-model="district" 
          :label="'Bairro'" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="street" 
          :label="'Rua / Avenida'" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="complement" 
          :label="'Complemento'" 
          color="black"
          bordercolor="#C4C4C4"
        />        
      
      </div>

      <div class="content-button">
        <RegisterButton
          class="mt-4" 
          label="Cadastrar" 
          @action="registerProperty"
        />        
      </div>

    </div>
  </div>

</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SignButton from '../components/input/SignButton'
  import SelectField from '../components/input/SelectField'
  import RegisterButton from '../components/input/RegisterButton'

  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
      SelectField,
      RegisterButton,
    },

    data() {
      return {
        brzipcode: '',
        state: '',
        city: '',
        district: '',
        street: '',
        complement: '',
        getstateinitial: '',
      }
    },

    props: {
      brstates: [
        {name: "Acre"},
        {name: "Alagoas" },
        {name: "Amapá" },
        {name: "Amazonas" },
        {name: "Bahia" },
        {name: "Ceará" },
        {name: "Distrito Federal" },
        {name: "Espírito Santo" },
        {name: "Goiás" },
        {name: "Maranhão" },
        {name: "Mato Grosso" },
        {name: "Mato Grosso do Sul" },
        {name: "Minas Gerais" },
        {name: "Pará" },
        {name: "Paraíba" },
        {name: "Paraná" },
        {name: "Pernambuco" },
        {name: "Piauí" },
        {name: "Rio de Janeiro" },
        {name: "Rio Grande do Norte" },
        {name: "Rio Grande do Sul" },
        {name: "Rondônia" },
        {name: "Roraima" },
        {name: "Santa Catarina" },
        {name: "São Paulo" },
        {name: "Sergipe" },
        {name: "Tocantins" },
      ],
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

        let state = this.$store.state
        let toasted = this.$toasted

        state.authRequest("properties/", "POST", data)
        .then((response) => {
          toasted.show('Propriedade cadastrada com sucesso').goAway(2000)
          this.$router.push({ name: 'home'})
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
    background: white
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .content-title {
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 10%;
    color: #2D9CDB;
    display: flex;
    justify-content: left; 
  }


  .content-button {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

</style>