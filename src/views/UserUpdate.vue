<template>
  <div class="userupdate">
    <TopBar 
      :iconleft="'chevron-left'"
      color="#56a3a6"
    />
    <div class="content-container">
      <div class="content-title">
        <h3> Editar conta </h3>
      </div>
      <div class="content-form">
        <PhotoUpload
          style="display:none"
          @action="onFileSelected" 
        />
        <TextField
          v-model="phone_number"
          class="mt-3"
          label="Telefone"
          color="#949090"
          :placeholder="phone_number"
        />
        <TextField 
          v-model="bio"
          class="mt-3"
          label="Bio"
          color="#949090"
          :placeholder="bio"
        />
        <DatePicker 
          v-model="birthdate"
          :label="'Aniversário'"
        />
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
    import PhotoUpload from '../components/input/PhotoUpload.vue'
    import TextField from '../components/input/TextField.vue'
    import SignButton from '../components/input/SignButton.vue'
    import TopBar from '../components/layout/TopBar.vue'
    import DatePicker from '../components/input/DatePicker.vue'


export default {

    components: {
        PhotoUpload,
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
            birthdate: '',
            username: '',
            date: '',
        }
    },
    beforeMount(){
        this.uploadProfile()
    },
    methods: {
        onFileSelected(event){
            this.profileImage = event
        },

        setDate() {
            this.birthdate = this.date
            this.birthdate = this.birthdate.substr(0 , 10)
            console.log(this.birthdate)
        },

        
        getLimitDate() { // Return the current day in ISO 8601
            let today = new Date()
            return (today.getFullYear() - 14) + '-' + (today.getMonth()+1) + '-' + today.getDate()
        },


        updateProfile(){     
            
            let formData = new FormData()
            formData.append("photo", this.profileImage)
            formData.append("phone_number", this.phone_number)
            formData.append("bio", this.bio)
            formData.append("birthdate", this.birthdate)

            let state = this.$store.state
            let toasted = this.$toasted

            state.authRequest('users/profile/', 'PATCH', formData)
                .then((response) => {
                    toasted.show(response).goAway(2000)
                })
                .catch((errors) => {
                    toasted.show(errors).goAway(2000)
                })
        },

        validateInput(){
            let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
            if (!this.email.match(emailRegex)) {
                this.$toasted.show('Email digitado não é válido').goAway(2000)
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
                    this.profileImage = response.data.photo
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
        justify-content: flex-end;
        width: 100%;
    }

    .content-form{
        width: 100%;
    }

</style>