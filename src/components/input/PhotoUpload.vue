<template>
  <div class="fileupload">
    <input 
      ref="fileInput"
      style="display:none"
      type="file"
      @change="onFileSelected"
    >
    <button @click="$refs.fileInput.click()">
      Leo Lindo
    </button>
  </div>
</template>

<script>
export default {
    data() {
        return{
            selectedFile: null
        }
    },
    methods: {
        onFileSelected(event){
            this.$emit('action', this.selectedFile = event.target.files[0])
        }
    },
}
</script>

<style>

</style>