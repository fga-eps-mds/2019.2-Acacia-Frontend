<template>
  <div class="tree-container">
    <TopBar
      iconleft="chevron-left"
      color="#2D9CDB"
    />
    <div class="tree-content">
      <div class="content-title">
        <h3> Cadastrar Arvore </h3>
      </div>

      <div class="tree-form">

        <v-select
          :items="tree_types"
          label="Espécie"
          v-model="tree_type"
        ></v-select>
        <TextField
          v-model="number_of_tree"
          type="number"
          class="mt-1"
          label="Número de árvores"
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField
          v-model="height_fruit"
          type="number"
          class="mt-1"
          label="$t('TreeRegister.fruit_height')"
          color="black"
          bordercolor="#C4C4C4"
        />
        <DatePicker
          v-model="date"
          :label="$t('HarvestRegister.date')"
        />

        <TextField
          v-model="haverst_for_year"
          type="number"
          label="Colheitas por ano"
          color="black"
          bordercolor="#C4C4C4"
        />

        <div class="property">
          <label>Propriedades:</label>
            <ul>
              <li
                v-for="property in properties"
                :key="property.id"
              >
                <div
                  class="carBody"
                  @click="selectCard(property.pk)"
                >
                  <p class="cardTitle">
                    {{ property.address }}
                  </p>
                  <font-awesome-icon
                    v-if="property.pk != propertyCard"
                    icon="chevron-right"
                    style="color: purple;"
                  />
                  <font-awesome-icon
                    v-if="property.pk === propertyCard"
                    icon="chevron-down"
                    style="color: purple;"
                  />
                </div>
                <div
                  v-if="property.pk === propertyCard"
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

        <div class="image-container ">
          <v-row align="center" justify="center">
            <v-img
              :src="preview.path"
              lazy-src="preview.path"
              aspect-ratio="1"
              max-width="330"
              max-height="200"
              class="grey darken-4"
            ></v-img>
          </v-row>

          <!-- <div class="preview-image">
              <img :src="preview.path" >
          </div>  -->
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
            @action="register"
            background-color="#2D9CDB"
          />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/layout/TopBar'
import TextField from '../components/input/TextField'
import ImageUpload from '../components/input/ImageUpload'
import SignButton from '@/components/input/SignButton'
import RegisterButton from '../components/input/RegisterButton'
import DatePicker from '../components/input/DatePicker'
import router from "@/router"

import axios from "axios"

  export default {
    components: {
      TopBar,
      TextField,
      SignButton,
      DatePicker,
      RegisterButton,
      ImageUpload,
    },
    created() {
      console.log('Component has been created!');
      let state = this.$store.state
      let toasted = this.$toasted

      state.authRequest("properties/", "GET")
      .then((response) => {
        console.log('Populando as propriedades...')
        console.log(response)
        let property_array = response.data
        console.log(property_array)
        console.log(this.properties)
        this.properties = property_array
      })
      .catch((error) => {
        console.log(error)
      })
    },
    data() {
      return {
        tree_type: '',
        number_of_tree: '',
        height_fruit: '',
        date: '',
        haverst_for_year: '',
        tree_picture: null,
        preview: {},
        propertyCard: '',
        properties: [],
        tree_types: ['Avocado', 'Pineapple', 'Banana', 'Persimmon', 'Coconut',
                     'FIG', 'Guava', 'Jabuticaba', 'Orange', 'Lemon', 'Apple']

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
              this.data !== '' &&
              this.propertyCard !== ''
      }
    },

    methods: {
      uploadImageSuccess(imageFile, imagePath){
        this.tree_picture = imageFile
        this.preview = imagePath
      },
      selectCard(property) {

        if (this.iconCard == "chevron-right") {
          this.propertyCard = property;
          this.iconCard = "chevron-down";
        }

        else if (this.iconCard == "chevron-down" && this.propertyCard != "" && this.propertyCard != property) {
          this.propertyCard = property;
          this.iconCard = "chevron-right";
        }

        else {
          this.propertyCard = "";
          this.iconCard = "chevron-right";
        }
      },
      register(){
        console.log("TIpo da árvore")
        console.log(this.tree_type)
        if (!this.formIsValid) {
          return
        }
        let data ={
          tree_type: this.tree_type,
          number_of_tree: this.number_of_tree,
          tree_height: this.number_of_tree,
        //  haverst_for_year: this.haverst_for_year,
        }
        let state = this.$store.state
        state.authRequest('properties/' + this.propertyCard + '/trees/', "POST", data)
        .then((response) => {
          console.log(response)
          toasted.show('Árvore cadastrada com sucesso').goAway(2000)
          this.$router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          console.log(error)
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
