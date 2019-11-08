<template>
  <div class="harvest">
    <TopBar 
      iconleft="chevron-left" 
      color="color-primary"
    />
    <div class="harvest-container">
      <div class="harvest-title raleway-thin">
        <a> {{ $t('HarvestRegister.register') }} </a>
      </div>
      
      <form class="harvest-form">
        <DatePicker 
          v-model="date"
          min="true"
          :label="$t('HarvestRegister.date')"
        />

        <v-text-field
          v-model="description"
          :error-messages="descriptionErrors"
          label="Description"
          required
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        ></v-text-field>  

        <v-text-field
          v-model="equipment"
          label="Equipment"
        ></v-text-field>  
        <v-row>
          <v-col 
            cols="12" 
            class="label-volunteers"
          >
            {{ $t('HarvestRegister.volunteerNumber') }}
          </v-col>
          <v-col
            cols="6"
            class="volunteer-quantity"
          >
            <v-text-field
              v-model="min_volunteers"
              :error-messages="min_volunteersErrors"
              label="Minimum"
              type="number"
              required
              @input="$v.min_volunteers.$touch()"
              @blur="$v.min_volunteers.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            class="volunteer-quantity"
          >
            <v-text-field
              v-model="max_volunteers"
              :error-messages="max_volunteersErrors"
              label="Maximum"
              type="number"
              required
              @input="$v.max_volunteers.$touch()"
              @blur="$v.max_volunteers.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">         
            <StringList
              v-model="rules"
            />
          </v-col>
        </v-row>
      </form>
      <div class="harvest-button">
        <SignButton
          :label="$t('HarvestRegister.creation')"
          padding="small"
          direction="right"
          @action="registerHarvest"
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
  import { required, minValue, maxValue } from 'vuelidate/lib/validators'

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
    validations: {
      date: { required },
      description: { required },
      min_volunteers: { required, minValue: minValue(2) },
      max_volunteers: { maxValue: maxValue(20) },
    },
    computed: {
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.required && errors.push('Description is required.')
        return errors
      },
      min_volunteersErrors () {
        const errors = []
        if (!this.$v.min_volunteers.$dirty) return errors
        !this.$v.min_volunteers.minValue && errors.push('minimum 2 volunteers.')
        !this.$v.min_volunteers.required && errors.push('Minimum Volunteers is required.')
        return errors
        return errors
      },
      max_volunteersErrors () {
        const errors = []
        if (!this.$v.max_volunteers.$dirty) return errors
        !this.$v.max_volunteers.maxValue && errors.push('maximum 20 volunteers.')
        return errors
      },
    },
    methods: {
      clearForm () {
        this.$v.$reset()
        this.date= ''
        this.description= ''
        this.equipment= ''
        this.max_volunteers= null
        this.min_volunteers= null
        this.status= ''
        this.rules= []
      },
      registerHarvest(){
        this.$v.$touch()
      
        if (this.$v.$invalid) {
          console.log("formulário inválido")
          return
        }
        console.log('formulário válido')
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
          status: 'Open',
          rules: rules
        }

        this.$store.state.authRequest('harvests', 'POST', data)
          .then((response) => {
            alert("Harvest record - Temporario!")
            router.push({name: 'home'})
          })
          .catch((error) => {
            alert("Error to register harvest! - Temporario")
          })
        }
      }
  }
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";


.harvest {
  display: flex;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  background: white;
  // background-image: linear-gradient(
  //   180deg,
  //   rgba(86, 163, 166, 1),
  //   rgba(75, 125, 170, 105)
  // );
}

.harvest-container{
  width: 100%;
  max-width:500px;
  margin: 1px;
  
}

.harvest-title {
   
  // color: $color-secundary-text-title;
  width: 100%;
  padding: 0px 25px;
  margin-top: 20%;
  margin-bottom: 20%;
  display: flex;
  justify-content: left;
  font-size: 30px;
  font-weight: bold;
  color: $color-primary-text-title;
}

.harvest-form {
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
  margin-right: auto;
  margin-left: auto;
}

.harvest-button {
  margin-top: 20px;
}
// -----------------------

.text-label{
  color: $color-secundary-text;
  padding: 15px 1% 0px 1% !important;
  text-align: left;
  font-size: 90%;
}

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

</style>
