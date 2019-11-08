<template>
    <div class="userupdate">
        <TopBar :iconleft="'chevron-left'" color="#56a3a6"/>
        <div class="content-container">
            <div class="content-title">
                <a style="font-size:35px; color:#56a3a6;"> Editar conta </a>
            </div>
            <PhotoUpload style="display:none" @action="onFileSelected" ></PhotoUpload>
            <TextField class="mt-3" v-model="phone_number" label="Telefone" color="#949090" :placeholder="phone_number"></TextField>
            <TextField class="mt-3" v-model="bio" label="Bio" color="#949090" :placeholder="bio"></TextField>
            <DateField class="datefield-container" label="Birthdate"></DateField>
            <div class="content-button">
                <SignButton class="mt-5" :label="'Salvar'" @action="updateProfile" color="#56a3a6"/>
            </div>
        </div>
    </div>
</template>

<script>
    import PhotoUpload from '../components/input/PhotoUpload.vue'
    import TextField from '../components/input/TextField.vue'
    import SignButton from '../components/input/SignButton.vue'
    import TopBar from '../components/layout/TopBar.vue'
    import DateField from '../components/input/DateField.vue'


export default {

    components: {
        PhotoUpload,
        SignButton,
        TextField,
        TopBar,
        DateField,
    },
    data (){
        return{
            profileImage: null,
            phone_number: '',
            bio: '',
            birthdate: '',
        }
    },
    methods: {
        onFileSelected(event){
            this.profileImage = event
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
                    this.phone_number = response.phone_number
                    this.bio = response.bio
                    this.profileImage = response.photo
                    this.birthdate = response.birthdate
                })
                .catch((errors) => {
                    toasted.show(errors).goAway(2000)
                })
        },
        

    },
    beforeMount(){
        this.uploadProfile()
    }

}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/colors.scss";

    .content-title {
        width: 100%;
        padding: 0px 25px;
        margin-bottom: 40%;
        color: $color-primary-text-title;
        display: flex;
        justify-content: left; 
    }

    .userupdate{
        width: 100%;
		height: 100%;
		position: absolute;
		margin-top: 0;
		text-align: center;
    }

    .content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
    .datefield-container{
        margin-top: 50px;
        width: 100%;
		height: 100%;
    }
</style>