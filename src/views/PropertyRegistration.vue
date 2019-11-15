
<template>
  <div class="property-form">
    <TopBar
      iconleft="chevron-left"
      color="#2D9CDB"
    />

    <div class="content-container">
      <div class="content-title">
        <h3> Cadastrar propriedade </h3>
      </div>

      <div class="content-form">
        <TextField style = "padding-bottom: 10px"
          v-model="BRZipCode"
          label="CEP"
          color="#949090"
        />
        <SelectField 
          v-model="state" 
          class="mt-3" 
          label="Estado" 
          color="#949090"
          bordercolor="#949090"
          :items="brstates"
        />
        <TextField 
          v-model="city" 
          class="mt-3" 
          label="Cidade" 
          color="#949090"
        />
        <TextField 
          v-model="district" 
          class="mt-3" 
          label="Bairro" 
          color="#949090"
        />
        <TextField 
          v-model="address" 
          class="mt-3" 
          label="Endereço" 
          color="#949090"
        />
        <SelectField 
          v-model="type_of_address" 
          class="mt-3" 
          label="Tipo de moradia" 
          color="#949090"
          bordercolor="#949090"
          :items="adrchoises"
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
  import SelectField from '../components/input/SelectField'
  import RegisterButton from '../components/input/RegisterButton'

  export default {
    components: {
      TopBar,
      TextField,
      SelectField,
      RegisterButton,
    },

    props: {
      brstates: {
          type: Array,
          default: function() { return [
            {name: "Acre", id: 1 },
            {name: "Alagoas", id: 2 },
            {name: "Amapá", id: 3 },
            {name: "Amazonas", id: 4 },
            {name: "Bahia", id: 5 },
            {name: "Ceará", id: 6 },
            {name: "Distrito Federal", id: 7 },
            {name: "Espírito Santo", id: 8 },
            {name: "Goiás", id: 9 },
            {name: "Maranhão", id: 10 },
            {name: "Mato Grosso", id: 11 },
            {name: "Mato Grosso do Sul", id: 12 },
            {name: "Minas Gerais", id: 13 },
            {name: "Pará", id: 14 },
            {name: "Paraíba", id: 15 },
            {name: "Paraná", id: 16 },
            {name: "Pernambuco", id: 17 },
            {name: "Piauí", id: 18 },
            {name: "Rio de Janeiro", id: 19 },
            {name: "Rio Grande do Norte", id: 20 },
            {name: "Rio Grande do Sul", id: 21 },
            {name: "Rondônia", id: 22 },
            {name: "Roraima", id: 23 },
            {name: "Santa Catarina", id: 24 },
            {name: "São Paulo", id: 25 },
            {name: "Sergipe", id: 26 },
            {name: "Tocantins", id: 27 },
        ]},
      },

      adrchoises: {
        type: Array,
        default: function () { return [
          {name: "Apartamento", id: 1 },
          {name: "Casa", id: 2 },
          {name: "Fazenda", id: 3 },
          {name: "Outro", id: 4 },
        ]},
      },
    },

    data() {
      return {
        type_of_address: '',
        BRZipCode: '',
        state: '',
        city: '',
        district: '',
        address: '',
      }
    },

    methods: {
      registerProperty(){
        if (!this.validateInput()) {
          return
        }

        // Code snipet to update the value of 'type_of_address'
        if (this.type_of_address == "Apartamento") {
          this.type_of_address = "Apartment"

        } else if (this.type_of_address == "Casa") {
          this.type_of_address = "House"

        } else if (this.type_of_address == "Fazenda") {
          this.type_of_address = "Farm"

        } else if (this.type_of_address == "Outro") {
          this.type_of_address = "Other"
        }

        // Code snipet to update the value of 'state'
        if (this.state == "Acre") {
          this.state = "AC"

        } else if (this.state == "Alagoas") {
          this.state = "AL"

        } else if (this.state == "Amapá") {
          this.state = "AP"

        } else if (this.state == "Amazonas") {
          this.state = "AM"

        } else if (this.state == "Bahia") {
          this.state = "BA"

        } else if (this.state == "Ceará") {
          this.state = "CE"

        } else if (this.state == "Distrito Federal") {
          this.state = "DF"

        } else if (this.state == "Espírito Santo") {
          this.state = "ES"

        } else if (this.state == "Goiás") {
          this.state = "GO"

        } else if (this.state == "Maranhão") {
          this.state = "MA"

        } else if (this.state == "Mato Grosso") {
          this.state = "MT"

        } else if (this.state == "Mato Grosso do Sul") {
          this.state = "MS"

        } else if (this.state == "Minas Gerais") {
          this.state = "MG"

        } else if (this.state == "Pará") {
          this.state = "PA"

        } else if (this.state == "Paraíba") {
          this.state = "PB"

        } else if (this.state == "Paraná") {
          this.state = "PR"

        } else if (this.state == "Pernambuco") {
          this.state = "PE"

        } else if (this.state == "Piauí") {
          this.state = "PI"

        } else if (this.state == "Rio de Janeiro") {
          this.state = "RJ"

        } else if (this.state == "Rio Grande do Norte") {
          this.state = "RN"

        } else if (this.state == "Rio Grande do Sul") {
          this.state = "RS"

        } else if (this.state == "Rondônia") {
          this.state = "RO"

        } else if (this.state == "Roraima") {
          this.state = "RR"

        } else if (this.state == "Santa Catarina") {
          this.state = "SC"

        } else if (this.state == "São Paulo") {
          this.state = "SP"

        } else if (this.state == "Sergipe") {
          this.state = "SE"

        } else if (this.state == "Tocantins") {
          this.state = "TO"
        }

          let data = {
          BRZipCode: this.BRZipCode,
          state: this.state,
          city: this.city,
          district: this.district,
          address: this.address,
          type_of_address: this.type_of_address,
        }

        let state = this.$store.state
        let toasted = this.$toasted

        state.authRequest("properties/", "POST", data)
        .then((response) => {
          toasted.show('Propriedade cadastrada com sucesso').goAway(2000)
          this.$router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          if(error.response.data.BRZipCode){
            this.$toasted.show(error.response.data.BRZipCode).goAway(2000)
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
          if(error.response.data.address){
            this.$toasted.show(error.response.data.address).goAway(2000)
          }
          if(error.response.data.type_of_address){
            this.$toasted.show(error.response.data.type_of_address).goAway(2000)
          }
        })

      },

      validateInput(){
        if (!this.BRZipCode) {
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

        if (!this.address) {
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

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image: none;
  }

  .content-title {
    h3{
      font-weight: bold;
    }
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 10%;
    color: $color-primary;
    display: flex;
    justify-content: left;
  }


  .content-button {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

  .content-form{
    width: 100%;
  }

</style>
