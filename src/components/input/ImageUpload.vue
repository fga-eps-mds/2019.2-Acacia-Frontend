<template>
  <div class="upload">
    <!-- <span class="ml-2 "> {{ imageURL.name }}</span> -->
    <div>
      <v-file-input
        :label="$t('TreeRegister.image')"
        accept="image/*"
        filled
        prepend-icon="mdi-camera"
        @change="uploadChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name:'ImageUpload',
    data(){
      return {
        imageURL: {},
        file: null,
        imageFile: '',
      }
    },
    methods: {
      addImage(file){
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
        if(!event.size){
          return false
        }
        let fileName = event.name
        if(fileName.lastIndexOf('.') <= 0) {
          return alert('Arquivo Invalido')
        }
        this.file = event
        this.addImage(this.file)
      },
    },
      // sempre limpar as imagens antes de criar uma nova instância
    // created () {
    //   this.images = []
    // }
  }
</script>

<style scoped lang="scss">
@import "@/assets/stylesheets/colors.scss";

.upload {
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  
}


</style>
