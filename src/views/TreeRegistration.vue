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

      <div class="tree-form">
        <v-select style="margin-left: 5px;"
          v-model="tree_type"
          :items="tree_types"
          :label="$t('TreeRegister.type')"
        />
        <v-row>
          <v-col cols="6">
            <TextField
              v-model="number_of_tree"
              type="number"
              :label="$t('TreeRegister.number_tree')"
              color="#949090"
              bordercolor="#C4C4C4"
              style="padding: 0px;"
            />
          </v-col>
          <v-col cols="6">
            <TextField
              v-model="height_fruit"
              type="number"
              :label="$t('TreeRegister.fruit_height')"
              color="#949090"
              bordercolor="#C4C4C4"
              style="padding: 0px;"
            />
          </v-col>
        </v-row>
        <v-select style="margin-left: 5px;"
          v-model="months"
          :items="month_items"
          attach
          chips
          :label="$t('TreeRegister.months')"
          multiple
        />

        <TextField
          v-model="haverst_for_year"
          type="number"
          :label="$t('TreeRegister.harvest_average')"
          color="#949090"
          bordercolor="#C4C4C4"
          style="padding: 0px;"
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
      </div>
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
  </div>
</template>

<script>
import TopBar from '../components/layout/TopBar'
import TextField from '../components/input/TextField'
import ImageUpload from '../components/input/ImageUpload'
import SignButton from '@/components/input/SignButton'
import router from "@/router"

import axios from "axios"

  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
      ImageUpload,
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
    computed: {
      icon(){
      return "chevron-right"
      },

      formIsValid () {
        return this.tree_type !== '' &&
              this.number_of_tree !== '' &&
              this.height_fruit !== '' &&
              this.months !== '' &&
              this.propertyCard !== ''
      }
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
        console.log(error)
      })
    },

    methods: {
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
        if (!this.formIsValid) {
          this.$toasted.show('Formulário preenchido incorretamente').goAway(2000)
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
                                console.log(response)})
            .catch((error) => {console.log(error)})
          }
          this.$toasted.show('Árvore cadastrada com sucesso').goAway(2000)
          this.$router.push({ name: 'dashboard' })

        })
        .catch((error) => {
          this.$toasted.show(JSON.stringify(error.response.data)).goAway(2000)
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
  // width: 100%;
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
