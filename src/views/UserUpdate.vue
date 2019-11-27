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
        <v-text-field
          ref="phone_number"
          v-model="phone_number"
          class="textfield"
          required
          :error-messages="phone_number_errors"
          :label="$t('UserUpdate.telephone')"
          @input="$v.phone_number.$touch()"
          @blur="$v.phone_number.$touch()"
        />
        <v-text-field
          ref="bio"
          v-model="bio"
          class="textfield"
          required
          :error-messages="bio_errors"
          :label="$t('UserUpdate.bio')"
          @input="$v.bio.$touch()"
          @blur="$v.bio.$touch()"
        />
        <DatePicker
          v-model="birthdate"
          :label="$t('UserUpdate.birthdate')"
          :max="true"
        />
        <div class="input">
          <ImageUpload
            :labelname="$t('UserUpdate.profile_photo')"
            @upload-complete="uploadImageSuccess"
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
    <Snackbar @reset="clearForm" />
  </div>
</template>

<script>
    import ImageUpload from '../components/input/ImageUpload'
    import SignButton from '../components/input/SignButton.vue'
    import Snackbar from '@/components/input/Snackbar.vue'
    import TopBar from '../components/layout/TopBar.vue'
    import { numeric, maxLength } from 'vuelidate/lib/validators'
    import DatePicker from '../components/input/DatePicker.vue'
    import router from "@/router"



export default {

    components: {
        ImageUpload,
        SignButton,
        Snackbar,
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
            size: true,
        }
    },

    validations: {
      phone_number: { numeric },
      bio: { maxLength: maxLength(800) },
    },

    computed: {
      phone_number_errors () {
        const errors = []
        if (!this.$v.phone_number.$dirty) return errors
        !this.$v.phone_number.numeric && errors.push(this.$t('UserUpdate.requirePhoneNumber'))
        return errors
      },
      bio_errors () {
        const errors = []
        if (!this.$v.bio.$dirty) return errors
        !this.$v.phone_number.maxLength && errors.push(this.$t('UserUpdate.requireBio'))
        return errors
      },
    },

    beforeMount(){
        this.uploadProfile()
    },

    methods: {

        clearForm () {
          this.$v.$reset()
          this.profileImage= null
          this.phone_number= ''
          this.bio= ''
          this.birthdate= ''
        },

        uploadImageSuccess(imageFile, imagePath){
          this.profileImage = imageFile
          this.preview = imagePath
        },

        onFileSelected(event){
            this.profileImage = event
        },

        updateProfile(){

          let formData = new FormData()
          if (this.profileImage !== null){
            formData.append('photo', this.profileImage, this.preview.name)
          }
          formData.append("phone_number", Number(this.phone_number))
          formData.append("bio", this.bio)
          formData.append("birthdate", this.birthdate)

          let state = this.$store.state

          state.authRequest('users/profile/', 'PATCH', formData)
            .then((response) => {
              this.$store.commit('snackbar/showMessage', {
                message: this.$t('UserUpdate.updatedUser'),
                color: 'success',
              })
              router.push({ name: 'dashboard' })
            })
            .catch((errors) => {
              console.log(errors)
              if (errors.response.data.bio) {
                this.$store.commit('snackbar/showMessage', {
                  message: errors.response.data.bio,
                  color: 'error',
                })
              }
              if (errors.response.data.birthdate) {
                this.$store.commit('snackbar/showMessage', {
                  message: errors.response.data.birthdate,
                  color: 'error',
                })
              }
              if (errors.response.data.phone_number) {
                this.$store.commit('snackbar/showMessage', {
                  message: errors.response.data.phone_number,
                  color: 'error',
                })
              }
              if (errors.response.data.photo) {
                this.$store.commit('snackbar/showMessage', {
                  message: errors.response.data.photo,
                  color: 'error',
                })
              }
            })
        },

        uploadProfile(){
            let state = this.$store.state

            state.authRequest('users/profile/', 'GET')
              .then((response) => {
                this.phone_number = response.data.phone_number
                this.bio = response.data.bio
                this.birthdate = response.data.birthdate
                this.date = this.birthdate
                this.username = response.data.username
                this.email = response.data.email
              })
              .catch((errors) => {
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

    .textfield {
      padding: 0px 20px;
      margin: 1%;
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
