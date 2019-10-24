<template>
  <div class="harvest-form">
    <TopBar iconleft="chevron-left" color="color-primary"/>
    <div class="content-container">
      <div class="content-title raleway-thin">
        <h3> Cadastrar colheita </h3>
      </div>
      <div class="content-form">
        <DatePicker labelDate="Data da colheita"
        />
        <TextField 
          class="mt-3" 
          v-model="equipment" 
          label="Equipamentos" 
          color="#949090"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="description" 
          label="Descrição" 
          color="#949090"
          bordercolor="#C4C4C4"
        />
        <v-row>
          <v-col cols="12" class="roboto-light color-secundary-text">
            Numero mínimo e máximo de voluntários
          </v-col>
          <v-col cols="6">
            <TextField  
              v-model="min_volunteers"  
              color="#949090"
              bordercolor="#C4C4C4"
              type="number"
              :placeholder="'Mínimo'"
              placeholderBlack="true"
            />       
          </v-col>
          <v-col cols="6">
            <TextField  
              v-model="max_volunteers" 
              color="#949090"
              bordercolor="#C4C4C4"
              type="number"
              :placeholder="'Máximo'"
              placeholderBlack="true"
            />
          </v-col>
        </v-row>
      </div>
      <div class="content-button">
        <SignButton
          class="mt-4" 
          label="Cadastrar" 
          @action="registerHarvest"
          direction="right"
          padding="small"
          color="light-blue"
        />        
      </div>
    </div>
  </div>

</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SignButton from '../components/input/SignButton'
  import DatePicker from '../components/input/DatePicker'
  import axios from "axios"
  import router from "../router"
  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
      DatePicker,
    },
    data() {
      return {
        date: '',
        description: '',
        equipment: '',
        max_volunteers: null,
        min_volunteers: null,
        status: '',
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
      }
    },
    props: {
    },
    computed: {
      stateInitials() {
      }
    },
    methods: {
      registerHarvest(){
        if (!this.validateInput()) {
          return
        }       
        
        let data = {
          date: this.date,
          description: this.description,
          equipment: this.equipment,
          max_volunteers: this.max_volunteers,
          min_volunteers: this.min_volunteers,
          status: this.status,
        }

        this.$store.state.authRequest('harvest', 'POST', data)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            if(error.response.data.date){
              this.$toasted.show(error.response.data.date).goAway(2000)
            }
            if(error.response.data.description){
              this.$toasted.show(error.response.data.description).goAway(2000)
            }
            if(error.response.data.equipment){
              this.$toasted.show(error.response.data.equipment).goAway(2000)
            }
            if(error.response.data.max_voluneteers){
              this.$toasted.show(error.response.data.max_voluneteers).goAway(2000)
            }
            if(error.response.data.status){
              this.$toasted.show(error.response.data.status).goAway(2000)
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

    .status{
        padding: 0px 20px;
    }

    .harvest-form {
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
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

</style>