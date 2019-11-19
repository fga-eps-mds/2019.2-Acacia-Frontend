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
      <div class="content-form">
      <form class="harvest-form">
        <v-select
          :items="properties.map((property) => { return {
            pk: property.pk,
            address: property.address
          }})"
          label="Select a property"
          item-text="address"
          item-value="pk"
          color="white"
          dense
          outlined
          v-model="selectedProperty"
        ></v-select>
        <DatePicker
          v-model="date"
          v-bind:min="true"
          :label="$t('HarvestRegister.date')"
        />
        <v-text-field
          v-model="description"
          :error-messages="descriptionErrors"
          label="Description"
          required
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        />

        <v-text-field
          v-model="equipment"
          label="Equipment"
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
          <v-col cols="12" class="pl-4 pr-4">
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
    <Snackbar @reset="clearForm"/>
  </div>
</template>

<script>
  import TopBar from '@/components/layout/TopBar'
  import SignButton from '@/components/input/SignButton'
  import DatePicker from '@/components/input/DatePicker'
  import StringList from '@/components/input/StringList'
  import Snackbar from '@/components/input/Snackbar.vue'
  import { required, minValue, maxValue } from 'vuelidate/lib/validators'
  import router from '@/router'

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
        properties: [],
        selectedProperty: '',
      }
    },
    created() {
      this.getUserProperties();
    },
    validations: {
      date: { required },
      description: { required },
      selectedProperty: { required },
      min_volunteers: { required, minValue: minValue(0) },
      max_volunteers: { maxValue: maxValue(100) },
    },
    computed: {
      selectedPropertyErrors() {
        const errors = []
        if (!this.$v.selectedProperty.$dirty) return errors
        !this.$v.selectedProperty.required && errors.push('Select a property.')
        return errors
      },
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
        this.selectedProperty = null
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
        let data = {
          date: this.date,
          description: this.description,
          equipment: this.equipment,
          max_volunteers: this.max_volunteers,
          min_volunteers: this.min_volunteers,
          status: 'Open',
        }
        let rulelist = this.rules
        this.$store.state.authRequest(
            'properties/' + this.selectedProperty + '/harvests/',
            'POST', data)
          .then((response) => {
            let ruleURL = 'properties/' + this.selectedProperty + '/harvests/' + response.data.pk + '/rules/'
            for (let i = 0; i < rulelist.length; i++) {
              let data = {
                description: rulelist[i]
              }
              this.$store.state.authRequest(ruleURL, "POST", data )
                .then(() => {})
                .catch(() => {})
            }
            this.$store.commit('snackbar/showMessage', {
                message: 'Harvest registered!',
                  color: 'success',
              })
            router.push({
              path:
                '/harvest/' + this.selectedProperty + '/' + response.data.pk + '/'
            })
          })
          .catch((error) => {
            console.log(error)
            this.$store.commit('snackbar/showMessage', {
              message: 'There was a problem registering your harvest',
              color: 'error',
            })
          })
      },
      getUserProperties() {
        this.$store.state.authRequest('properties/', 'GET')
          .then((response) => {
            this.properties = response.data
            if (this.properties.length == 0) {
              this.$store.commit('snackbar/showMessage', {
                message: 'You need a property to register a harvest into',
                color: 'error',
              })
            }
          })
          .catch((error) => {
            this.$store.commit('snackbar/showMessage', {
              message: 'An error has ocurred finding your properties',
              color: 'success',
              })
          })
      },
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
}
.harvest-container{
  width: 100%;
  max-width:500px;
  margin: 1px;
}
.harvest-title {
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
