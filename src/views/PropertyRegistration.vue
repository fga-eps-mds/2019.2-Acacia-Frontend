
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

      <form class="property-registration-form">
        <v-text-field 
          v-model="BRZipCode" 
          class="mt-3" 
          label="CEP"
          color="black"
          required
          @input="$v.BRZipCode.$touch()"
          @blur="$v.BRZipCode.$touch()"
        />
        <SelectField style = "padding-bottom: 10px"
          v-model="state"
          label="Estado"
          color="#949090"
          bordercolor="#C4C4C4"
          :items="brstates"
        />
        <v-text-field 
          v-model="city" 
          class="mt-3" 
          label="Cidade" 
          color="black"
          required
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()" 
        />
        <v-text-field 
          v-model="district" 
          class="mt-3" 
          label="Bairro" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <v-text-field 
          v-model="address" 
          class="mt-3" 
          label="Endereço" 
          required
          @input="$v.address.$touch()"
          @blur="$v.address.$touch()"
        />
        <SelectField
          v-model="type_of_address"
          label="Tipo de moradia"
          color="#949090"
          bordercolor="#C4C4C4"
          :items="adrchoises"
        />
      </form>

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
  import { required, numeric } from 'vuelidate/lib/validators'

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

    validations: {
      type_of_address: { required },
      BRZipCode: { required, numeric },
      state: { required },
      city: { required },
      district: { required },
      address: { required },
    },

    computed: {
      type_of_addressErrors () {
        const errors = []
        if (!this.$v.type_of_address.$dirty) return errors
        !this.$v.type_of_address.required && errors.push('Type of address is required.')
        return errors        
      },
      BRZipCodeErrors () {
        const errors = []
        if (!this.$v.BRZipCode.$dirty) return errors
        !this.$v.BRZipCode.required && errors.push('CEP is required.')
        !this.$v.BRZipCode.numeric && errors.push('Only numbers are allow')
        return errors        
      },      
      stateErrors () {
        const errors = []
        if (!this.$v.state.$dirty) return errors
        !this.$v.state.required && errors.push('State is required.')
        return errors        
      }, 
      cityErrors () {     
        const errors = []
        if (!this.$v.city.$dirty) return errors
        !this.$v.city.required && errors.push('City is required.')
        return errors        
      },   
      districtErrors () {     
        const errors = []
        if (!this.$v.district.$dirty) return errors
        !this.$v.district.required && errors.push('District is required.')
        return errors        
      },
      AddressErrors () {     
        const errors = []
        if (!this.$v.Address.$dirty) return errors
        !this.$v.Address.required && errors.push('Address is required.')
        return errors        
      },                       
    },

    methods: {
      clearFrom () {
        this.$v.reset()
        this.type_of_address = ''
        this.BRZipCode = ''
        this.state = ''
        this.city = ''
        this.district = ''
        this.address =''
      },
      registerProperty(){
        this.$v.$touch();

        if (!this.$v.$invalid) {
          console.log("formulario válido")
        }
        else {
          console.log("formulario inválido")
          return
        }
<<<<<<< HEAD

=======
        
>>>>>>> Change toasted for vuelidate, it doesnt save if there're invalid fields
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

        this.$store.state.authRequest('propertyRegustration', 'POST', data)
          .then((response) => {
            alert("Property Registrated")
            router.push({name: 'dashboard'})
          })
          .catch((error) => {
            alert("Error to register property!")
          })
      }
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
    background-image: none;
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
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

</style>
