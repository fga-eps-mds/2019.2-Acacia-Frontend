<template>
    <div id="signbutton" class="container">
        <button> {{label}} </button>
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

    button{
        background-color: $color-primary;
        padding: 8px 65px;
        font-size: 120%;

        font-family: RalewayBold;
        color: $color-default-text;
        border: none;
        border-radius: 12px;
        margin: 10px;
        box-shadow: 0 2px 3px 0.5px $color-shadow;
        outline: none;
        
    }
    button:active{
        box-shadow: none;
        border: none;
        margin: 10px 9px 9px 10px;
    }

</style>