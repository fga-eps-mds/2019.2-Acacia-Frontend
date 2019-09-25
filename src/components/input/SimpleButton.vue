<template>
    <div id="simplebutton" class="container">
        <button class="btn btn-primary"> {{label}} </button>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                default: '',
                type: String
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";

    

</style>