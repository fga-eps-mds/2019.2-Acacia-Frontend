<template>
    <div class="user-update">
        <TopBar
            :iconleft="'chevron-left'"
            color="#56a3a6"
        />
        <div class="mt-5 content-container">
            <div class="content-title">
                <a style="font-size:35px; color:#56a3a6;">
                    Editar conta
                </a>
            </div>
            <PhotoUpload 
                style="display:none" 
                @action="onFileSelected">
            </PhotoUpload>
            <TextField 
                class="mt-3"
                v-model="email"
                :label="this.$t('ProfilePage.email')"
                color="#949090"
                :placeholder="email">
            </TextField>
            <TextField 
                class="mt-3"
                v-model="username"
                :label="this.$t('ProfilePage.username')"
                color="#949090"
                :placeholder="username">
            </TextField>
            <TextField 
                class="mt-3"
                v-model="phone_number"
                :label="this.$t('ProfilePage.phoneNumber')"
                color="#949090"
                :placeholder="phone_number">
            </TextField>
            <TextField
                class="mt-3"
                v-model="bio"
                :label="this.$t('ProfilePage.bio')"
                color="#949090"
                :placeholder="bio">
            </TextField>
            <DateField
                class="datefield-container"
                v-model="date"
                :label="this.$t('ProfilePage.birthdate')"
                :maxDate="getLimitDate()"
                @confirm-date="setDate()"
            />
            <div class="content-button">
                <SignButton
                    class="mt-5"
                    :label="'Salvar'"
                    @action="updateProfile"
                    color="#56a3a6"
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
            email: '',
            phone_number: '',
            bio: '',
            birthdate: '',
            username: '',
            date: '',
        }
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
            console.log(this.profileImage)
            
            let formData = new FormData()
            formData.append("photo", this.profileImage)
            formData.append("phone_number", this.phone_number)
            formData.append("bio", this.bio)
            formData.append("birthdate", this.birthdate)

            console.log(formData)

            let state = this.$store.state
            let toasted = this.$toasted

            state.authRequest('users/profile/', 'PATCH', formData)
                .then((response) => {
                    console.log(response)
                    toasted.show('SignPages.positiveStatus').goAway(2000)
                })
                .catch((errors) => {
                    console.log(errors)
                    toasted.show('SignPages.negativeStatus').goAway(2000)
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
                    console.log(errors)
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

    .user-update{
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
        margin-top: 20px;
        width: 100%;
		height: 100%;
    }
</style>