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

        <TextField 
          v-model="tree_type" 
          class="mt-1" 
          label="Espécie"
          color="black"
          bordercolor="#C4C4C4" 
        />           
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
          label="Aultura média dos futros" 
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
          class="mt-1" 
          label="Colheitas por ano" 
          color="black"
          bordercolor="#C4C4C4"
        />
        
        <div class="file-label">
          <label for="file">Propriedade: Flavio Vieira</label>
          <a @click="'hideImg = !hideImg'"> 
            <font-awesome-icon :icon="icon" style="color:black"/>
          </a>
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

        <div class="content-button">
          <SignButton
            :label="$t('HarvestRegister.create')" 
            padding="small"
            direction="right"
            @action="register"
          />
        </div>
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

    data() {
      return {
        tree_type: '',
        number_of_tree: '',
        height_fruit: '',
        date: '',
        haverst_for_year: '',
        tree_picture: null,
        preview: {}

      }
    },
    computed: {
      icon(){
      return "chevron-right"
      //                : "chevron-down"
      // return hideImg ? "chevron-right"
      //                : "chevron-down"
      },
      
      formIsValid () {
        return this.tree_type !== '' &&
              this.number_of_tree !== '' &&
              this.height_fruit !== '' &&
              this.data !== ''
      }
    },
    
      methods: {
        uploadImageSuccess(imageFile, imagePath){
          this.tree_picture = imageFile
          this.preview = imagePath
        },
     
      register(){
        if (!this.formIsValid) {
          return
        }     
        
        let formData = new FormData()
          formData.append('tree_type', this.tree_type)
          formData.append('number_of_tree', this.number_of_tree)
          formData.append('height_fruit', this.height_fruit)
          formData.append('matury_date', this.date)
          formData.append('haverst_for_year', this.haverst_for_year)
          formData.append('tree_picture', this.tree_picture)

          // formData.append('_method', 'PUT');

          console.log(formData)

          // this.$store.dispatch('recordTree', formData)


//========== temporario para salvar com o formulario como FormData ==========
//=> configurar store:

          const baseURL = this.$store.state.baseURL;
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization": "Bearer " + this.$store.state.getAccessToken()
                }
            }
            axios.post(baseURL + 'tree/', formData, config)
              .then((response) => {
                console.log("response")

              this.$toasted.show(this.$t("SignPages.positiveStatus"))
              .goAway(2000);
              router.push({ name: "home" });
              })
              .catch(() => {
                router.push({ name: "" });
                      })
//=============================================================================
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
  align-items: center;
  justify-content: center;
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
  justify-content: center;
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