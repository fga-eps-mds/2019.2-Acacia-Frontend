<template>
	<div id="topbar" class="navbar fixed-top">
        <font-awesome-icon :icon="iconleft" @click="selectLeft()"> </font-awesome-icon>
        <font-awesome-icon :icon="iconright" @click="selectRight()"> </font-awesome-icon>
    </div>
</template>

<script>
    export default {
        props: {            
            iconleft: {
                default: '',
                type: String
            },

            iconright: {
                default: '',
                type: String
            },
        },

        methods: {
            selectLeft(){
                if (this.iconleft=='chevron-left'){
                    this.$router.go(-1)
               } else if (this.iconleft=='bars'){
                    // The sidebar feature will be implemented here
               }
            },

            selectRight(){
                if (this.iconright=='pen'){
                    // The edit feature will be implemented here
                } else if (this.iconright=='comment-alt'){
                    // The chat feature will be implemented here
                } else if (this.iconright=='plus'){
                    // The add feature will be implemented here
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>