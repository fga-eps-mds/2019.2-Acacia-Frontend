<template>
    <div class="datefield-container"> 
        <div v-if="label" class="p-0 col-12 text-color-secundary datefield-label">{{ label }}</div>
        <datetime class="datefield-format" :max-datetime="getDateToday()" ></datetime>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            default: '',
            type: String,
        },
    },

    methods: {
        getDateToday() { // Return the current day in ISO 8601
            let today = new Date()
            return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
        } 
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";
    .datefield-container {
        width: 100%;
		padding-right: 20px;
		padding-left: 20px;
		margin-right: auto;
		margin-left: auto;
    }
    .datefield-label {
        text-align: left;
        margin-bottom: 10px;
		font-size: 90%;
    }
    .datefield-format {
        width: 100%;
        text-align: left;   
    }
    .vdatetime-input input{
        border-top: 0;
		border-left: 0;
		border-right: 0; 
    }
</style>