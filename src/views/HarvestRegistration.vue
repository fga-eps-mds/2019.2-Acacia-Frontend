<template>
  <div class="harvest-form">
    <TopBar :iconleft="'chevron-left'" color="#2D9CDB"/>
    <div class="content-container">
      <div class="content-title">
        <h3> Cadastrar colheita </h3>
      </div>
      <div class="content-form">
        <TextField 
          class="mt-3" 
          v-model="date" 
          label="Date" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="status" 
          label="status" 
          color="black"
          bordercolor="#C4C4C4" 
        />
        <TextField 
          class="mt-3" 
          v-model="neighbor_access" 
          label="Neighbors of my property allow access for harvesters?" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="equipment" 
          label="Equipment needed" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="description" 
          label="description" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="max_voluneteers" 
          label="Max Voluneteers" 
          color="black"
          bordercolor="#C4C4C4"
        />        
      </div>
      <div class="content-button">
        <SignButton
          class="mt-4" 
          label="Criar colheita" 
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
        date: '',
        description: '',
        equipment: '',
        max_voluneteers: '',
        neighbor_access: '',
        status: '',
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
          max_voluneteers: this.max_voluneteers,
          neighbor_access: this.neighbor_access,
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
            if(error.response.data.neighbor_access){
              this.$toasted.show(error.response.data.neighbor_access).goAway(2000)
            }
            if(error.response.data.status){
              this.$toasted.show(error.response.data.status).goAway(2000)
            }
          })
      },
      validateInput(){
        //if (!this.brzipcode) {
        //  this.$toasted.show('Insira seu CEP').goAway(2000)
        //  return false
        //}
        //if (!this.state) {
        //  this.$toasted.show('Selecione um estado').goAway(2000)
        //  return false
        //}
        //if (!this.city) {
        //  this.$toasted.show('Insira uma cidade').goAway(2000)
        //  return false
        //}
        //if (!this.district) {
        //  this.$toasted.show('Insira um bairro').goAway(2000)
        //  return false
        //}
        //
        //if (!this.street) {
        //  this.$toasted.show('Insira um endereço').goAway(2000)
        //  return false
        //}
        return true
      },
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";
  
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
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 20%;
    color: #2D9CDB;
    display: flex;
    justify-content: left; 
  }
  .content-button {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: right;
  }
</style>