<template>
  <div class="property">
    <TopBar 
      iconleft="chevron-left"
      color="#2D9CDB"
    />
    <v-card>
      <div class="property-container">
        <div class="property-title">
          <a> Register property </a>
        </div>
        
        <form class="property-form">

          <v-row>
            <v-col cols="6">
              <v-text-field
                ref="BRZipCode"
                v-model="BRZipCode"
                type="number"
                :error-messages="BRZipCode_errors"
                label="ZIP Code"
                @input="$v.BRZipCode.$touch()"
                @blur="$v.BRZipCode.$touch()"
                required
              ></v-text-field>
            </v-col>   
            <v-col cols="6"> 
              <v-autocomplete
                v-model="type_of_address"
                :error-messages="type_of_address_errors"
                :items="adrchoises"
                label="Type of address"
                @input="$v.type_of_address.$touch()"
                @blur="$v.type_of_address.$touch()"
                required
              ></v-autocomplete>
            </v-col>   
          </v-row> 
          
          <v-text-field
            ref="address"
            v-model="address"
            :error-messages="address_errors"
            label="Address"
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
            required
          ></v-text-field>
          
          <v-text-field
            ref="district"
            v-model="district"
            :error-messages="district_errors"
            label="District"
            @input="$v.district.$touch()"
            @blur="$v.district.$touch()"
            required
          ></v-text-field>

          <v-row>
            <v-col
              cols="6"
            >
              <v-text-field
                ref="city"
                v-model="city"
                :error-messages="city_errors"
                label="City"
                @input="$v.city.$touch()"
                @blur="$v.city.$touch()"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
            >
              <v-autocomplete
                ref="state"
                v-model="state"
                :items="brstates"
                label="State"
                :error-messages="state_errors"
                @input="$v.state.$touch()"
                @blur="$v.state.$touch()"
                required
              ></v-autocomplete>
            </v-col>
          </v-row>

        </form>

        <div class="image-container ">
          <v-row align="center" justify="center">
            <v-img
              :src="preview.path"
              lazy-src="preview.path"
              aspect-ratio="1"
              max-width="330"
              max-height="200"
              class="grey lighten-2"
            ></v-img>
          </v-row>
        </div> 
        <div class="input">
          <ImageUpload
            @upload-complete="uploadImageSuccess"    
          />   
        </div>

        <div class="property-button">
          <RegisterButton
            class="mt-4" 
            label="Cadastrar" 
            @action="registerProperty"
          />        
        </div>
      </div>
    </v-card>
    <Snackbar @reset="clearForm" ></Snackbar>    
  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SelectField from '../components/input/SelectField'
  import RegisterButton from '../components/input/RegisterButton'
  import ImageUpload from '../components/input/ImageUpload'
  import Snackbar from '@/components/input/Snackbar.vue'
  import { required, numeric } from 'vuelidate/lib/validators'

  export default {
    components: {
      TopBar,
      RegisterButton,
      ImageUpload,
      Snackbar,
      ImageUpload,
    },
    data() {
      return {
        type_of_address: '',
        BRZipCode: '',
        state: '',
        city: '',
        district: '',
        address: '',
        tree_picture: null,
        preview: {},
        brstates: [
          'Acre',
          'Alagoas',
          'Amapá',
          'Amazonas',
          'Bahia',
          'Ceará',
          'Distrito Federal',
          'Espírito Santo',
          'Goiás',
          'Maranhão',
          'Mato Grosso',
          'Mato Grosso do Sul',
          'Minas Gerais',
          'Pará',
          'Paraíba',
          'Paraná',
          'Pernambuco',
          'Piauí',
          'Rio de Janeiro',
          'Rio Grande do Norte',
          'Rio Grande do Sul',
          'Rondônia',
          'Roraima',
          'Santa Catarina',
          'São Paulo',
          'Sergipe',
          'Tocantins',
        ],
        adrchoises: [
          'Apartamento',
          'Casa',
          'Fazenda',
          'Outro',
         ]
      }
    },

    validations: {
      type_of_address: { required },
      BRZipCode: { required },
      city: { required },
      district: { required },
      address: { required },
      state: { required },
    },

    computed: {
      type_of_address_errors () {
        const errors = []
        if (!this.$v.type_of_address.$dirty) return errors
        !this.$v.type_of_address.required && errors
          .push('type of address cant be black.!')
        return errors
      },
      BRZipCode_errors () {
        const errors = []
        if (!this.$v.BRZipCode.$dirty) return errors
        !this.$v.BRZipCode.required && errors.push('Zip Code cant be black.')
        return errors
      },
      city_errors () {
        const errors = []
        if (!this.$v.city.$dirty) return errors
        !this.$v.city.required && errors.push('City cant be black.')
        return errors
      },
      state_errors () {
        const errors = []
        if (!this.$v.state.$dirty) return errors
        !this.$v.state.required && errors.push('State cant be black.')
        return errors
      },
      district_errors () {
        const errors = []
        if (!this.$v.district.$dirty) return errors
         !this.$v.district.required && errors.push('District cant be black.')
        return errors
      },
      address_errors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
         !this.$v.address.required && errors.push('Address cant be black.')
        return errors
      },      

    },
    methods: {
      clearForm () {
        this.$v.$reset(),
        this.type_of_address= ''
        this.BRZipCode= ''
        this.state= ''
        this.city= ''
        this.district= ''
        this.address= ''
      }, 
      
      uploadImageSuccess(imageFile, imagePath){
          this.tree_picture = imageFile
          this.preview = imagePath
      },

      registerProperty(){
        this.$v.$touch()
      
        if (this.$v.$invalid) {
          console.log("formulário inválido")
          return
        }  
          console.log("formulário valido")
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
            this.$store.commit('snackbar/showMessage', {
                message: 'Property successfully registered!',
                color: 'success',
            })
          this.$router.push({ name: 'home'})
        })
        .catch((error) => {
            this.$store.commit('snackbar/showMessage', {
              message: 'There was a problem registering your property',
              color: 'error',
            })
        })
      },
    }
  }

</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

.property{
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.property-container{
  width: 100%;
  max-width:500px;
  margin: 1px;
}

.property-title {
  width: 100%;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: left;
  font-size: 28px;
  color: #2D9CDB;
}

.property-form {
  width: 100%;
  padding-right: 40px;
  padding-left: 30px;
  margin-right: auto;
  margin-left: auto;
}

.property-button {
  margin-top: 5px;
  margin-bottom: 25px;
  color: $color-default-text;
  font-family: RobotoBold;
 
}

.image-container {
  max-width: auto;
  max-height: 250px;
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 10px;
  border-radius: 5px;
  box-sizing: border-box;

  border: 1px dashed #D6D6D6;
  border-radius: 4px;
  background-color: white;

}.input{
  padding-right: 35px;
  padding-left: 10px;
  padding-top: 5px;
}

img{
  max-width: 100%;
  height: auto;
}

.gradient {
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}
</style>
