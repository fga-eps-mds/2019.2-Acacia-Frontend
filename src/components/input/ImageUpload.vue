<template>
  <div class="upload">
    
    <!-- <v-btn
      color="blue-grey"
      class="ma-2 white--text"
      fab
      @click="$refs.fileInput.click()"
      @change="uploadChange"
    >
      <v-icon dark>mdi-cloud-upload</v-icon>
    </v-btn> -->

      <a  class="ml-2" @click="$refs.fileInput.click()"> 
        <font-awesome-icon
          icon="upload"
          size="2x" 
          style="color:black"
        /> 
     </a>
      <span class="ml-2 "> {{ imageURL.name }}</span>
      <div>
        <input
          style="display: none"
          class="input-file"
          type="file" 
          ref="fileInput"
          accept="image/*"
          @change="uploadChange"
        >
      </div>
  </div>
</template>

<script>
  export default {
    name:'imageUpload',

    data(){
      return {
        imageURL: {},
        file: null,
        imageFile: '',
      }
    },

    methods: {
      addImage(file){
        console.log('funcao addImage')
        let fr = new FileReader()

        // let fd = new FormData()
        // fd.append('file', file)
        
        this.imageFile = file
        fr.onload = (event) => {
          let imageURI = event.target.result
          if(imageURI) {
            this.imageURL = {name: file.name, path: imageURI}
            
            this.$emit('upload-complete', this.imageFile, this.imageURL)
          }
        }
        fr.readAsDataURL(file)
      },

      uploadChange(event) {
        let files = event.target.files
        if(!files.length){
          return false
        }
        let fileName = files[0].name
        if(fileName.lastIndexOf('.') <= 0) {
          return alert('Arquivo Invalido')
        }
        this.file = files[0]
        this.addImage(this.file)
      },
    },
      // sempre limpar as imagens antes de criar uma nova instância
    // created () {
    //   this.images = []
    // }  
  }
</script>

