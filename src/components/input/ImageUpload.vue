<template>
  <div class="upload">
      <a  class="ml-2" @click="$refs.fileInput.click()"> 
        <font-awesome-icon
          icon="upload"
          size="1x" 
          style="color:black"
        /> 
      </a> 
      <span class="ml-2 "> {{ image.name }}</span>
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
        image: {},
        file: null,
        teste: '',
      }
    },

    methods: {
      addImage(file){
        console.log('funcao addImage')
        let fr = new FileReader()

        // let fd = new FormData()
        // fd.append('file', file)
        
        this.teste = file
        fr.onload = (event) => {
          let imageURI = event.target.result
          if(imageURI) {
            this.image = {name: file.name, path: imageURI}
            
            this.$emit('upload-complete', this.teste, this.image)
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

<style>
  .upload{
    display: flex;
    background: rgb(205, 207, 243);
   
  }

</style>
