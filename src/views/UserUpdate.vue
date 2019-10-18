<template>
    <div class="userupdate">
        <TopBar :iconleft="'chevron-left'"/>
		<div class="content-container">
            <FileUpload @action="onFileSelected" ></FileUpload>
            <datetime v-model="date"></datetime>
		</div>
    </div>
</template>

<script>
    import FileUpload from '../components/input/FileUpload.vue'
    import TopBar from '../components/layout/TopBar.vue'

export default {

    components: {
        FileUpload,
        TopBar
    },
    methods: {
        onFileSelected(event){
            this.propertyImage = event
        }
    },
    data (){
        return{
            propertyImage: null,
            date: new Date().toISOString().substr(0, 10),
        }
    }

}
</script>

<style>

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