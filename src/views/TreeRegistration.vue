<template>
  <div class="tree-container">
    <TopBar
      iconleft="chevron-left"
      color="#2D9CDB"
    />
    <div class="tree-content">
      <div class="content-title">
        <h3> {{ $t('TreeRegister.register') }}   </h3>
      </div>

      <form class="tree-form">
        <v-autocomplete
          v-model="tree_type"
          :items="tree_types"
          :error-messages="tree_type_errors"
          :label="$t('TreeRegister.type')"
          required
          @input="$v.tree_type.$touch()"
          @blur="$v.tree_type.$touch()"
        />

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="number_of_tree"
              type="number"
              required
              :error-messages="number_of_tree_errors"
              :label="$t('TreeRegister.number_tree')"
              @input="$v.number_of_tree.$touch()"
              @blur="$v.number_of_tree.$touch()"
            />     
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="height_fruit"
              type="number"
              required
              :error-messages="height_fruit_errors"
              :label="$t('TreeRegister.fruit_height')"
              @input="$v.height_fruit.$touch()"
              @blur="$v.height_fruit.$touch()"
            />  
          </v-col>
        </v-row>
        
        <v-select 
          v-model="months"
          attach
          chips
          required
          multiple
          style="margin-left: 5px;"
          :items="month_items"
          :error-messages="months_errors"
          :label="$t('TreeRegister.months')"
          @input="$v.months.$touch()"
          @blur="$v.months.$touch()"
        />

        <v-text-field
          v-model="haverst_for_year"
          type="number"
          required
          :error-messages="haverst_for_year_errors"
          :label="$t('TreeRegister.harvest_average')"
          @input="$v.haverst_for_year.$touch()"
          @blur="$v.haverst_for_year.$touch()"
        />  

        <label style="display: flex; padding-top: 15px; margin-left: 5px; color: #949090">
          {{ $t('TreeRegister.property') }} </label>
        <div
          class="property"
          style="border-bottom: 1px solid gray;"
        >
          <ul>
            <li
              v-for="property in properties"
              :key="property.id"
            >
              <div
                class="carBody"
                @click="selectCard(property)"
              >
                <p class="cardTitle">
                  {{ property.address }}
                </p>
                <font-awesome-icon
                  v-if="property != propertyCard"
                  icon="circle"
                  style="color: purple;"
                />
                <font-awesome-icon
                  v-if="property === propertyCard"
                  icon="check-circle"
                  style="color: purple;"
                />
              </div>
              <div
                v-if="property === propertyCard"
                class="contentCard"
              >
                <p class="cardTitle">
                  {{ property.type_of_address }}
                  {{ property.BRZipCode }}
                  {{ property.state }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </form>
      <div class="input">
        <ImageUpload
          @upload-complete="uploadImageSuccess"
        />
      </div>

      <SignButton
        :label="$t('HarvestRegister.creation')"
        padding="small"
        direction="right"
        background-color="#2D9CDB"
        @action="register"
      />
    </div>
    <Snackbar 
      @reset="clearForm"
    />
  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import ImageUpload from '../components/input/ImageUpload'
  import SignButton from '@/components/input/SignButton'
  import { required, numeric } from 'vuelidate/lib/validators'
  import Snackbar from '@/components/input/Snackbar'
  import router from "@/router"
  import axios from "axios"
  
  export default {
    components: {
      TopBar,
      SignButton,
      ImageUpload,
      Snackbar,
    },
    data() {
      return {
        tree_type: '',
        number_of_tree: '',
        height_fruit: '',
        months: '',
        haverst_for_year: '',
        tree_picture: null,
        preview: {},
        properties: [],
        iconCard: 'circle',
        tree_types: ['Avocado', 'Pineapple', 'Banana', 'Persimmon', 'Coconut',
                     'FIG', 'Guava', 'Jabuticaba', 'Orange', 'Lemon', 'Apple'],
        month_items: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'],
        propertyCard: '',
      }
    },
    
    validations: {
      tree_type: { required },
      number_of_tree: { required },
      height_fruit: { required },
      months: { required },
      haverst_for_year: { required },
    },
    
    computed: {
      icon(){
      return "chevron-right"
      },
      tree_type_errors () {
        const errors = []
        if (!this.$v.tree_type.$dirty) return errors
        !this.$v.tree_type.required && errors
          .push('Tree type cant be black!')
        return errors
      },
      number_of_tree_errors () {
        const errors = []
        if (!this.$v.number_of_tree.$dirty) return errors
        !this.$v.number_of_tree.required && errors
          .push('Number of tree cant be black.')
        return errors
      },
      height_fruit_errors () {
        const errors = []
        if (!this.$v.height_fruit.$dirty) return errors
         !this.$v.height_fruit.required && errors
         .push('Height fruits cant be black.')
        return errors
      },
      months_errors () {
        const errors = []
        if (!this.$v.months.$dirty) return errors
         !this.$v.months.required && errors
          .push('Fruinting Months is required.')
        return errors
      }, 
      haverst_for_year_errors () {
        const errors = []
        if (!this.$v.haverst_for_year.$dirty) return errors
         !this.$v.haverst_for_year.required && errors
          .push('Haverst fo year cant be black')
        return errors
      }, 
    },
    created() {
      let state = this.$store.state
      let toasted = this.$toasted
      state.authRequest("properties/", "GET")
      .then((response) => {
        let property_array = response.data
        this.properties = property_array
      })
      .catch((error) => {
      })
    },
    methods: {
      clearForm(){
        this.$v.$reset(),
        this.tree_type= '',
        this.number_of_tree= '',
        this.height_fruit= '',
        this.months= '',
        this.haverst_for_year= '',
        this.tree_picture= null,
        this.preview= {},
        this.properties= [],
        this.iconCard= '',
        this.tree_types= [],
        this.month_items= [],
        this.propertyCard= ''
      }, 
      
      uploadImageSuccess(imageFile, imagePath){
        this.tree_picture = imageFile
        this.preview = imagePath
      },
      selectCard(property) {
        let lan = this.$store.state.getCookieLanguage()
        if (lan !== 'en'){
          // Code snipet to update the value of 'type_of_address'
          if (property.type_of_address == "Apartment") {
            property.type_of_address = "Apartamento"
          } else if (property.type_of_address == "House") {
            property.type_of_address = "Casa"
          } else if (property.type_of_address == "Farm") {
            property.type_of_address = "Fazenda"
          } else if (property.type_of_address ==  "Other") {
            property.type_of_address = "Outro"
          }
        }
        if (this.iconCard == "circle") {
          this.propertyCard = property;
          this.iconCard = "check-circle";
        }
        else if (this.iconCard == "check-circle" && this.propertyCard != ""
                  && this.propertyCard != property) {
          this.propertyCard = property;
          this.iconCard = "circle";
        }
        else {
          this.propertyCard = "";
          this.iconCard = "circle";
        }
      },
      register(){
       this.$v.$touch()
      
        if (this.$v.$invalid) {
          return
        }  
        let data ={
          tree_type: this.tree_type,
          number_of_tree: this.number_of_tree,
          tree_height: this.number_of_tree,
        }
        let formData = new FormData()
        Object.keys(data).map(e => {
            formData.append(e, data[e])
        })
        if (this.tree_picture !== null){
          formData.append('picture', this.tree_picture, this.preview.name)
        }
        let state = this.$store.state
        state.authRequest('properties/' + this.propertyCard.pk + '/trees/', "POST", formData)
        .then((response) => {
          let tree_pk = response.data.pk
          // after tree is created, creates harvest_months objects
          for (var i = 0; i < this.months.length; i++) {
            let month_data = {'harvest_month': this.months[i]}
            state.authRequest('properties/' + this.propertyCard.pk + '/trees/' + tree_pk + '/harvest_months/',
                              "POST", month_data)
            .then((response) =>{
              })
            .catch((error) => {})
          }
          this.$store.commit('snackbar/showMessage', {
            message: 'Tree successfully registered!',
            color: 'success',
          })
          this.$router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          this.$store.commit('snackbar/showMessage', {
            message: 'Deu ruim',
            color: 'error',
          })
        })
       },
      },
  }
</script>

<style scoped lang="scss">
@import "@/assets/stylesheets/colors.scss";
.text-small {
  font-size: 10px;
}
.tree-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(250, 250, 250);
}
.tree-content {
  width: 100%;
  max-width:650px;
  margin: 1px;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.content-title {
  display: flex;
  color: #2D9CDB;
  margin-top: 30px;
  margin-bottom: 20px;
}
  .file-label{
  display: flex;
  justify-content: space-between;
  color: black;
  margin: 10px;
  font-size: 1rem;
  flex-wrap: wrap;
  align-items: center
}
.tree-button {
  margin-top: 3px;
  display: flex;
  justify-content: flex-end;
}
.image-container {
  max-width: 700px;
  max-height: 350px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px dashed #D6D6D6;
  border-radius: 4px;
  background-color: white;
}
img{
  max-width: 100%;
  height: auto;
}
</style>
