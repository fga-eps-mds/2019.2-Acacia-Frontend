<template>
  <div class="harvest-form">
    <TopBar 
        iconleft="chevron-left" 
        color="color-primary"
        style="background-color: white"/>
    <div class="content-container">
      <div class="content-title raleway-thin">
        <h3> Cadastrar colheita </h3>
      </div>
      <div class="content-form">
        <DatePicker 
          :label="'Data da colheita'"
          v-model="date"/>
        <TextField 
          class="mt-3" 
          v-model="description" 
          label="Descrição" 
          color="#949090"
          bordercolor="#C4C4C4"
        />
        <TextField 
          class="mt-3" 
          v-model="equipment" 
          label="Equipamentos" 
          color="#949090"
          bordercolor="#C4C4C4"
        />
        <div>
          <div class="mt-5 roboto-light textfield-label color-secundary-text ">
            Regras da colheita
          </div>
          <StringList class="container" v-model="rules"/>
        </div>
        <v-row>
          <v-col cols="12" class="roboto-light color-secundary-text number-volunteers">
            Número de voluntários
          </v-col>
          <v-col cols="6" class="volunteer-quantity">
            <TextField  
              v-model="min_volunteers"  
              color="#949090"
              bordercolor="#C4C4C4"
              label="mínimo"
              type="number"
              :placeholder="'Mínimo'"
              placeholderBlack
            />       
          </v-col>
          <v-col cols="6" class="volunteer-quantity">
            <TextField  
              v-model="max_volunteers" 
              color="#949090"
              bordercolor="#C4C4C4"
              label="máximo"
              type="number"
              :placeholder="'Máximo'"
              placeholderBlack
            />
          </v-col>
        </v-row>
      </div>
      <div class="content-button">
        <SignButton
          label="Cadastrar" 
          @action="registerHarvest"
          direction="right"
          padding="small"
        />        
      </div>
    </div>
  </div>

</template>

<script>
  import TopBar from '@/components/layout/TopBar'
  import TextField from '@/components/input/TextField'
  import SignButton from '@/components/input/SignButton'
  import DatePicker from '@/components/input/DatePicker'
  import StringList from '@/components/input/StringList'
  import router from "@/router"
  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
      DatePicker,
      StringList,
    },
    data() {
      return {
        date: '',
        description: '',
        equipment: '',
        max_volunteers: null,
        min_volunteers: null,
        status: '',
        rules: [],
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
        // if (!this.validateInput()) {
        //   return
        // }
        
        let rules = []

        for (let i = 0; i < this.rules.length; i++) {
          rules.push({"description" : this.rules[i]})
        }
        
        let data = {
          date: this.date,
          description: this.description,
          equipment: this.equipment,
          max_volunteers: this.max_volunteers,
          min_volunteers: this.min_volunteers,
          status: this.status,
          rules: rules
        }

        console.log('FAZENDO A REQUEST')
        this.$store.state.authRequest('harvests', 'POST', data)
          .then((response) => {
            console.log('FOI:', response)
          })
          .catch((error) => {
            console.log('ERRO:', error)
          })
      },
      validateInput(){
        if (!this.date) {
          this.$toasted.show('Insira a data').goAway(2000)
          return false
        }
        if (!this.min_volunteers) {
          this.$toasted.show('Insira o número minimo de voluntários').goAway(2000)
          return false
        }
        if (!this.max_volunteers) {
          this.$toasted.show('Insira o número máximo de voluntários').goAway(2000)
          return false
        }
        if (this.min_volunteers > this.max_voluneteers) {
          this.$toasted.show('Insira corretamente o número de voluntários').goAway(2000)
          return false
        }
        if (this.rules.length > 10) {
          this.$toasted.show('Diminua o número de regras da colheita').goAway(2000)
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

    .number-volunteers{
      font-weight: bold;
      font-size: 90%;
  		color: $color-secundary-text;
      padding: 20px 0px 0px 0px;
    }

    .volunteer-quantity{
      padding: 10px 15px;
    }

    .harvest-form {
      width: 100%;
      height: 100%;
      position: absolute;
      margin-top: 0;
      text-align: center;
      background: white;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin-top: 80px;
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