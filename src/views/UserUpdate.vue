<template>
    <div class="userupdate">
        <TopBar :iconleft="'chevron-left'" class="bg-color-primary"/>
		<div class="content-container">
            <PhotoUpload @action="onFileSelected" ></PhotoUpload>
            <TextField class="mt-3" v-model="username" label="Nome" color="#949090"></TextField>
            <TextField class="mt-3" v-model="email" label="Email" color="#949090"></TextField>
            <TextField class="mt-3" v-model="phone" label="Telefone" color="#949090"></TextField>
            <TextField class="mt-3" v-model="status" label="Bio" color="#949090"></TextField>
        </div>
        <div class="content-button">
            <SignButton class="mt-4" :label="'Salvar'" @action="updateProfile"/>
        </div>
    </div>
</template>

<script>
    import PhotoUpload from '../components/input/PhotoUpload.vue'
    import TextField from '../components/input/TextField.vue'
    import SignButton from '../components/input/SignButton.vue'
    import TopBar from '../components/layout/TopBar.vue'

export default {

    components: {
        PhotoUpload,
        SignButton,
        TextField,
        TopBar
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

<style>

    .text-field-border{
        color: black;
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

</style>