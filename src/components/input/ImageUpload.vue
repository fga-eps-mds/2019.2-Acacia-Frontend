<template>
  <div class="upload">
    <div>
      <v-file-input
        :label="labelname"
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
    props: {
      labelname: {
        default: "",
        type: String
      },
    },

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
