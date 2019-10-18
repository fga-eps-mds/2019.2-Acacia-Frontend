<template>
	<div id="topbar" class="navbar fixed-top">
        <font-awesome-icon v-if="iconleft" :icon="iconleft" @click="selectLeft()" :style="componentStyle"> </font-awesome-icon>
        <font-awesome-icon v-if="iconright" :icon="iconright" @click="selectRight()" :style="componentStyle"> </font-awesome-icon>
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
            color: {
                default: '',
                type: String
            },
        },
        computed: {
            componentStyle() { 	
                let componentColor = `color:${this.color};`
                return componentColor
            }
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
    #topbar {
        padding: 15px;
    }
</style>