<template>
    <button class="button " :class="{ sb1, sb2, sb3, sb4}"
       @click="$emit('action')"> 
        {{ label }} 
        
    </button>
</template>

<script>
    export default {
        props: {
            label: {},
            sb1: {type: Boolean},
            sb2: {type: Boolean},
            sb3: {type: Boolean},
            sb4: {type: Boolean},
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";

    .button{
        padding: 8px 20px;
         
		height: 50px;
		width: 130px;
        font-size: 120%;
        font-size: 120%;
        background-color: $color-primary;
        font-family: RalewayBold;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        margin: 20px;
        box-shadow: 0 2px 3px 0.5px $color-shadow;
        outline: none;
        cursor: pointer;
        transition: all 10ms;
        
    }
    .button:active{
        background-color: green;
        box-shadow: none;
        border: none;
    }
    .button:hover{
        transform: scale(1.05);
        background-color: #305c83;

    }
    .button.sb1 {
        background-color: #2D9CDB;
        color: $color-default-text;
    }
    .button.sb1:hover{
        transform: scale(1.02);
    }
    .button.sb1:active {
        color: greenyellow;

    }
    .button.sb2 {
        grid: span 3;
        background-color: forestgreen;
        color: $color-default-text;

    }
  .button.sb2:active {
        background-color: white;
        color: red;

    }
    .button.sb3 {
        background-color: fuchsia;
        color: $color-default-text;

    }
  
    .button.sb3:active {
        background-color: rgb(64, 66, 78);
        color: rgb(214, 161, 45);

    }

</style>