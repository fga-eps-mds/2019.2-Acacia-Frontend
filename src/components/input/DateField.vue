<template>
    <div class="datefield-container"> 
        <div v-if="label" class="p-0 col-12 text-color-secundary datefield-label">{{ label }}</div>
        <datetime
            class="datefield-format"
            input-class="input-format"
            :max-datetime="maxDate"
            input-style="border-top:0; border-left:0; border-right:0;"
            :value="labelDate"
            @confirm="sendDate()"
        ></datetime>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            default: '',
            type: String,
        },
        maxDate: {
            default: '',
            type: String,
        },
        labelDate: {
            default: '',
            type: String,
        },
    },

    methods: {
        sendDate(datetime){
            console.log("That is ok whit event")
            const myDate = datetime.value;
            this.$emit('confirm-date', {date: this.myDate})
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";
    .datefield-container {
        width: 100%;
        margin-left: 6px;
		padding-right: 20px;
		padding-left: 20px;
		margin-right: auto;
    }
    .datefield-label {
        text-align: left;
		font-size: 90%;
    }
    .datefield-format {
        width: 100%;
        height: 100%;
        text-align: left;   
    }
    .input-format {
        border-color: #949090;
    }
</style>