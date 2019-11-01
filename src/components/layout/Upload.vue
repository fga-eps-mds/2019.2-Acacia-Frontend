<template>
  <form  @submit.prevent="sendFile" enctype="multipart/form-data">
  
    <div class="field">
        
      <div class="file is-boxed is-primary">
        
        <label class="file-label">
          <input 
            class="file-input"
            type="file"
            ref="file"
            @change="selectFile"
          /> 

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>  
            </span>
            <span class="file-label">
                chose a file..
            </span>
          </span>

          <span v-if="file" class="file-name">{{ file.name }}</span>

        </label>
      </div>
    </div>

    <div class="fiel">

        <button class="button is-info"></button>

    </div>
  
  
    </div>
  
  </form>
</template>

<script>
export default {
    name: "uploadFile",

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
                await axios.post('/upload', formData);

            } catch(err)
                console.log(err);
            // axios.post('/api', { file: this.file})
        }
    }

}