<template>
  <form
    enctype="multipart/form-data"
    @submit.prevent="sendFile"
  >
    <div class="field">
      <div class="file is-boxed is-primary">
        <label class="file-label">
          <input
            ref="file"
            class="file-input"
            type="file"
            @change="selectFile"
          >

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label">
              choose a file..
            </span>
          </span>

          <span
            v-if="file"
            class="file-name"
          >{{ file.name }}</span>

        </label>
      </div>
    </div>

    <div class="fiel">
      <button class="button is-info" />
    </div>
  </form>
</template>

<script>
export default {
    name: "UploadFile",

    data() {
        return {
            file: ""
        }
    },
    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0]
        },
        sendFile(){
            const formData = new FormData();
            formData.append('file', this.file);
            try{
                axios.post('/upload', formData);

            } catch(err){
                console.log(err);
              }
            // axios.post('/api', { file: this.file})
        }
    }

}
