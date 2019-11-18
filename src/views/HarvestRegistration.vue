<template>
  <div class="harvest">
    <TopBar
      iconleft="chevron-left"
      color="color-primary"
    />
    <div class="content-container">
      <div class="content-title raleway-thin">
        <h3> {{ $t('HarvestRegister.register') }} </h3>
      </div>

      <form class="harvest-form">
        <DatePicker
          v-model="date"
          min="true"
          :label="$t('HarvestRegister.date')"
          picked="today"
        />

        <v-text-field
          v-model="description"
          class="mt-3"
          :label="$t('HarvestRegister.description')"
          color="#949090"
          :error-messages="descriptionErrors"
          required
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        />

        <v-text-field
          v-model="equipment"
          class="mt-3"
          :label="$t('HarvestRegister.equipment')"
          color="#949090"
        />
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
            />
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
            />
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
    <Snackbar @reset="clearForm" />
  </div>
</template>

<script>
  import TopBar from '@/components/layout/TopBar'
  import SignButton from '@/components/input/SignButton'
  import DatePicker from '@/components/input/DatePicker'
  import StringList from '@/components/input/StringList'
  import Snackbar from '@/components/input/Snackbar.vue'
  import { required, minValue, maxValue } from 'vuelidate/lib/validators'

  export default {
    components: {
      TopBar,
      SignButton,
      DatePicker,
      StringList,
      Snackbar,
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

      delayTouch($v) {
        $v.$reset()
        if (touchMap.has($v)) {
          clearTimeout(touchMap.get($v))
        }
        touchMap.set($v, setTimeout($v.$touch, 1000))
      },

      registerHarvest(){
        this.$v.$touch()

        if (this.$v.$invalid) {
          return
        }
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
            this.$store.commit('snackbar/showMessage', {
                message: 'harvest successfully registered',
                color: 'success',
            })
            this.$router.push({name: 'dashboard'})
          })
          .catch((error) => {
            console.log(error)
            this.$store.commit('snackbar/showMessage', {
              message: 'There was a problem registering your harvest',
              color: 'error',
            })
          })
        }
      }
  }
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/colors.scss";
  
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
    width: auto;
    height: auto;
    margin-top: 80px;
    background: white;
  }

  .content-title {
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
    justify-content: center;
  }
  
  .harvest {
    display: flex;
    height: 100vh;
    align-items: flex-start;
    justify-content: center;
    background: white;
  }

  .harvest-button {
    margin-top: 20px;
  }

</style>
