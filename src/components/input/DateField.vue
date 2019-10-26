<template>
    <div class="datefield-container"> 
        <div v-if="label" class="p-0 col-12 text-color-secundary datefield-label">{{ label }}</div>
        <datetime
            class="datefield-format"
            v-model="dateLocal"
            color="#376996"
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
    model: {
        prop: 'date',
        event: 'confirm-date'
    },

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
        date: {
            default: '',
            type: String,
        }
    },

    computed: {
        dateLocal: {
            get: function(){
                return this.date
            },
            set: function(value){
                this.$emit('confirm-date', value)
            }
        }
    },

    created() {
        this.dateLocal = new Date().toISOString().substr(0, 10)
    },
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