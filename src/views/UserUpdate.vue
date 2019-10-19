<template>
    <div class="userupdate">
        <TopBar :iconleft="'chevron-left'" color="#56a3a6"/>
        <div class="content-container">
            <div class="content-title">
                <a style="font-size:35px; color:#56a3a6;"> Editar conta </a>
            </div>
            <PhotoUpload @action="onFileSelected" ></PhotoUpload>
            <TextField class="mt-3" v-model="username" label="Nome" color="#949090"></TextField>
            <TextField class="mt-3" v-model="email" label="Email" color="#949090"></TextField>
            <TextField class="mt-3" v-model="phone" label="Telefone" color="#949090"></TextField>
            <TextField class="mt-3" v-model="status" label="Bio" color="#949090"></TextField>
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
            username: '',
            email: '',
            phone: '',
            status: '',
        }
    },
    methods: {
        onFileSelected(event){
            this.profileImage = event
        },
        updateProfile(){

        }
    },

}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/colors.scss";

    .content-title {
        width: 100%;
        padding: 0px 25px;
        margin-bottom: 20%;
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