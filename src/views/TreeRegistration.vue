<template>
  <div class="tree-container">
    <TopBar 
      iconleft="chevron-left"
      color="#2D9CDB"
    />
    <div class="tree-container"  > 
      <div class="content-title">
        <h3> Cadastrar Arvore </h3>
      </div>

      <div class="tree-form">
        <TextField 
<<<<<<< HEAD
          v-model="tree_type" 
=======
          v-model="treeType" 
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
          class="mt-3" 
          label="Espécie"
          color="black"
          bordercolor="#C4C4C4" 
        />           
        <TextField 
<<<<<<< HEAD
          v-model="number_of_tree"
          type="number"
=======
          v-model="numberTree" 
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
          class="mt-3" 
          label="Número de árvores" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
<<<<<<< HEAD
          v-model="height_fruit"
          type="number"
=======
          v-model="heightFruit" 
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
          class="mt-3" 
          label="Aultura média dos futros" 
          color="black"
          bordercolor="#C4C4C4" 
        />

        <TextField 
<<<<<<< HEAD
          v-model="matury_date"
          type="date"
=======
          v-model="maturyDate" 
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
          class="mt-3" 
          label="Possivel data de Colheita" 
          color="black"
          bordercolor="white"
        />
        <input type="date" v-model="matury_date">

        <TextField 
<<<<<<< HEAD
          v-model="haverst_for_year"
          type="number"
=======
          v-model="haverstForYear" 
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
          class="mt-3" 
          label="Colheitas por ano" 
          color="black"
          bordercolor="#C4C4C4"
        />
<<<<<<< HEAD
        
        <div class="file-label">
          <label for="file">Propriedade: {{ fileName }} </label>
          <font-awesome-icon icon="camera" style="color:black"/>
        </div><hr>
      
        <div class="dropbox">
          <span>
            <img :src="imageURL" height="150">
          </span>

          <button @click="onPickFile">Upload Image</button>
          <input
            style="display: none"
            type="file" 
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          >
        </div> 
=======
        <label for="File">Propriedade </label>
        <div class="img-propriedade">
          <input 
            type="file" 
            @change="onFileChanged"
            accept="image/*"
          >
          <img 
            v-if="treeImage" 
            :src="treeImageUrl"
            height="150"
          />
        </div>
      <div>
      </div>
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7

          <div class="tree-button">
            <b-button @click="recordTree">Registrar</b-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBarBeta'
  import TextField from '../components/input/TextField'

  export default {
    components: {
      TopBar,
      TextField,
    },

    data() {
      return {
<<<<<<< HEAD
        tree_type: '',
        number_of_tree: '',
        height_fruit: '',
        matury_date: '',
        haverst_for_year: '',
        imageURL: '',
        fileName:'',
        tree_picture: null,
      }
    },
    methods: {
      onPickFile() {
        this.$refs.fileInput.click()
        console.log("entrou on pick file")
      },
      onFilePicked(event) {
        const files = event.target.files
        this.fileName = files[0].name
        console.log ("file Name")
        console.log (files[0].name)
        if(this.fileName.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
          
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageURL = fileReader.result
          console.log ("filereader imgUrl")
          console.log (fileReader.result)
        })
        fileReader.readAsDataURL(files[0])
        this.tree_picture = files[0]
        console.log("file reader files[0]")
        console.log (files[0])
=======
        treeType:'',
        numberTree: '',
        heightFruit: '',
        maturyDate: '',
        haverstForYear: '',
        treeImage: null,
        treeImageUrl: null,
      }
    },
    methods: {
      onFileChanged (event) {
        const files = event.target.files
        //let filename = files[0].name
        //if (filename.lastIndexOf('.') <= 0 ){
          //return alert('Please add a valid photo!')
        //}
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () =>{
          this.treeImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.treeImage = files[0]
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
      },

      recordTree(){
        console.log("entrou on record treee")
        if (!this.validateInput()) {
          return
        }       
        let data = {
          tree_type: this.tree_type,
          number_of_tree: this.number_of_tree,
          height_fruit: this.height_fruit,
          matury_date: this.matury_date,
          haverst_for_year: this.haverst_for_year,
          tree_picture: this.tree_picture
        //   tree_picture: JSON.stringify(this.tree_picture)
        
          }
          // console.log("const dataa")
          // console.log (treeData.tree_type)
          // console.log (treeData.number_of_tree)
          // console.log (treeData.height_fruit)
          // console.log (treeData.matury_date)
          // console.log (treeData.haverst_for_year)
          // console.log (treeData.tree_picture)

        //   this.$store.dispatch('recordTree', treeData)
        //   this.$router.push('/home')

          // let fd = new FormData()
          // fd.append('tree_type', 'this.tree_type')
          // fd.append('number_of_tree', 'this.number_of_tree')
          // fd.append('height_fruit', 'this.height_fruit')
          // fd.append('matury_date', 'this.matury_date')
          // fd.append('haverst_for_year', 'this.haverst_for_year')
          // fd.append('tree_picture', 'this.tree_picture')
          // console.log("entrou fd")
          // console.log(fd)

      // upload() {
      //   fd.append('tree_picture', this., this.selectedFile.name)
      //   $http.post(baseUrl, data)
      //   // $http.post(baseUrl, fd, {
      //   //     onUploadProgrees: uploadEvent => {
      //   //       console.log('Upload Progress: ' + 
      //   //         Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
      //   //     }
      //   // })
      //     .then(response => {
      //       console.log(response)
      //     })
      // },
        // console.log(fd).tree_picture
        // console.log(fd.tree_picture)
        this.$store.state.noAuthRequest('tree', 'POST', data)
        // this.$store.state.authRequest('tree', 'POST', data)
       
        .then((response) => {
          // this.$router.push({ name: 'signin'})
          // router.push({name: 'home'})
        
        })
        .catch((error) => {
<<<<<<< HEAD
         
=======
          if(error.response.data.treeType){
            this.$toasted.show(error.response.data.treeType).goAway(2000)
          }
          if(error.response.data.numberTree){
            this.$toasted.show(error.response.data.numberTree).goAway(2000)
          }
          if(error.response.data.heightFruit){
            this.$toasted.show(error.response.data.heightFruit).goAway(2000)
          }
          if(error.response.data.maturyDate){
            this.$toasted.show(error.response.data.maturyDate).goAway(2000)
          }
          if(error.response.data.haverstForYear){
            this.$toasted.show(error.response.data.haverstForYear).goAway(2000)
          }
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
        })
      },

      validateInput(){
        if (!this.treeType) {
          this.$toasted.show('Insira a espécie da árvore').goAway(2000)
          return false
        }

        if (!this.numberTree) {
          this.$toasted.show('Insira a quantidade de árvores').goAway(2000)
          return false
        }

        if (!this.heightFruit) {
          this.$toasted.show('Insira a altura média dos frutos').goAway(2000)
          return false
        }

<<<<<<< HEAD
        // if (!this.matury_date) {
        //   this.$toasted.show('Insira uma data aproximada de colheita').goAway(2000)
        //   return false
        // }
=======
        if (!this.maturyDate) {
          this.$toasted.show('Insira uma data aproximada de colheita').goAway(2000)
          return false
        }
>>>>>>> 2f0ba9f12ec0f4ea34de7d809037fed9896b37a7
        
        if (!this.haverstForYear) {
          this.$toasted.show('Insira a numero de colheitas por ano').goAway(2000)
          return false
        }

        return true
      },
    }
  }

</script>

<style scoped lang="scss">
@import "@/assets/stylesheets/colors.scss";
  
  .tree-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(250, 250, 250);
    flex-grow: 1;
  }
  .tree-content {
    width: 100%;
    max-width:350px;
    margin: 1px;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }
  
  .dropbox {
    display: flex;
    height: 180px;
    min-height: 100px; 
    flex-wrap: wrap;
    padding: 10px 10px;
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
    margin: 20px;
    justify-content: center;
    align-content: flex-end;
    display: block;
   
    cursor: pointer;
    background-size: cover;
    background-position: center center;
  }
  /* 
  .image-input {
    opacity: 1; /invisivel!
    position: absolute;
    cursor: pointer;
  } 
  
  .dropbox:hover {
    opacity: 0.1;
    background: rgb(86, 137, 226); 
  }*/
  
  .content-title {
    display: flex;
    color: #2D9CDB;
    justify-content: left;
    margin-top: 40px;
    margin-bottom: 50px;
  }

   .file-label{
    display: flex;
    justify-content: space-between;
    color: black;
    margin: 20px;
    font-size: 1rem;
    flex-wrap: wrap;
    align-items: center
  }

  .tree-button {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

</style>