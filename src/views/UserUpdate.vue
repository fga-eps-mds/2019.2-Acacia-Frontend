<template>
  <div class="userupdate">
    <TopBar 
      :iconleft="'chevron-left'"
      color="#56a3a6"
    />
    <div class="content-container">
      <div class="content-title">
        <h3> {{ $t('UserUpdate.edite_profile') }} </h3>
      </div>
      <div class="content-form">
        <TextField
          v-model="phone_number"
          class="mt-3"
          :label="$t('UserUpdate.telephone')"
          color="#949090"
          :placeholder="phone_number"
        />
        <TextField 
          v-model="bio"
          class="mt-3"
          :label="$t('UserUpdate.bio')"
          color="#949090"
          :placeholder="bio"
        />
        <DatePicker 
          min="true"
          v-model="birthdate"
          :label="$t('UserUpdate.birthdate')"
        />
        <div class="input">
          <ImageUpload
            @upload-complete="uploadImageSuccess"
            :labelName="$t('UserUpdate.profile_photo')"
          />
        </div>
      </div>
      <div class="content-button">
        <SignButton 
          color="#56a3a6"
          class="mt-5"
          :label="'Salvar'"
          @action="updateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
    import ImageUpload from '../components/input/ImageUpload'
    import TextField from '../components/input/TextField.vue'
    import SignButton from '../components/input/SignButton.vue'
    import TopBar from '../components/layout/TopBar.vue'
    import DatePicker from '../components/input/DatePicker.vue'
    import router from "@/router"



export default {

    components: {
        ImageUpload,
        SignButton,
        TextField,
        TopBar,
        DatePicker,
    },
    data (){
        return{
            profileImage: null,
            email: '',
            phone_number: '',
            bio: '',
            preview: {},
            birthdate: '',
            username: '',
            date: '',
        }
    },
    beforeMount(){
        this.uploadProfile()
    },
    methods: {
        uploadImageSuccess(imageFile, imagePath){
          this.profileImage = imageFile
          this.preview = imagePath
        },

        onFileSelected(event){
            this.profileImage = event
        },

        updateProfile(){    
          
          if (!this.validateInput()) {
            return
          }

          let formData = new FormData()
          if (this.profileImage !== null){
            formData.append('photo', this.profileImage, this.preview.name)
          }
          formData.append("phone_number", Number(this.phone_number))
          formData.append("bio", this.bio)
          formData.append("birthdate", this.birthdate)

          let state = this.$store.state
          let toasted = this.$toasted

          state.authRequest('users/profile/', 'PATCH', formData)
            .then((response) => {
              this.$toasted.show(this.$t('UserUpdate.updatedUser')).goAway(2000)
              router.push({ name: 'dashboard' }) 
            })
            .catch((errors) => {
              console.log(errors)
              if (errors.response.data.bio) {
                this.$toasted.show(errors.response.data.bio).goAway(2000);
              }
              if (errors.response.data.birthdate) {
                this.$toasted.show(errors.response.data.birthdate).goAway(2000);
              }
              if (errors.response.data.phone_number) {
                this.$toasted.show(errors.response.data.phone_number).goAway(2000);
              }
              if (errors.response.data.photo) {
                this.$toasted.show(errors.response.data.photo).goAway(2000);
              }
            })
        },

        validateInput(){
            if(Number(this.phone_number) == NaN){
              this.$toasted.show(this.$t('UserUpdate.requirePhoneNumber')).goAway(2000)
              return false
            }
            if(this.bio.length > 800){
              this.$toasted.show(this.$t('UserUpdate.requireBio')).goAway(2000)
              return false
            }
            return true
        },

        uploadProfile(){    
            let state = this.$store.state
            let toasted = this.$toasted

            state.authRequest('users/profile/', 'GET')
                .then((response) => {
                    console.log(response)
                    this.phone_number = response.data.phone_number
                    this.bio = response.data.bio
                    this.birthdate = response.data.birthdate
                    this.date = this.birthdate
                    this.username = response.data.username
                    this.email = response.data.email
                })
                .catch((errors) => {
                    toasted.show(errors).goAway(2000)
                })
        },
        

    },
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/colors.scss";

    .userupdate{
      width: 100%;
      height: 100%;
      position: absolute;
      margin-top: 0;
      text-align: center;
      background: white;
    }

    .content-title {
        h3{
            font-weight: bold;
        }
        width: 100%;
        padding: 0px 25px;
        margin-bottom: 10%;
        color: $color-primary;
        display: flex;
        justify-content: left; 
    }

    .input{
      padding: 0px 20px;
    }

    .user-update{
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: 0;
        text-align: center;
        background: white;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: white;
        background-image: none;
	}

    .content-button {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .content-form{
        width: 100%;
    }

</style>