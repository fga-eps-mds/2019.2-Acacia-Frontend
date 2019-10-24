<template>
    <div id="stringlist" class="list-container">
        <div class="p-1">
            <v-row>
                <v-col cols="10">
                    <TextField 
                        color="black"
                        class="mr-3"  
                        v-model="textfield"/>
                </v-col>
                <v-col cols="2">
                    <font-awesome-icon
                        class="mt-2"
                        @click="addNewListElementAndSaveLast"
                        icon="plus" 
                        style="color:black"/>
                </v-col>
            </v-row>
        </div>
        <div class="row p-2 border m-1" v-for="(item, index) in list">
            <div class="col-10 text-left">
                {{ item }}
            </div>
            <div class="col-2">
                <font-awesome-icon
                    @click="eraseListElement(index)"
                    icon="minus" 
                    style="color:black"/>
            </div>
        </div>
    </div>
</template>

<script>
import TextField from '@/components/input/TextField'
export default {
    components: {
        TextField,
    },
    props: {
        list: {
            type: Array
        },
    },
    data() {
        return {
            textfield: ''
        }
    },
    model: {
		prop: 'list',
		event: 'textfield-change'
	},
	computed: {
		listLocal: {
			get: function() {
					return this.variable
			},
			set: function(value) {
					this.$emit('stringlist-change', value)
			}
		},
    },
    methods: {
        addNewListElementAndSaveLast() {
            if (!this.textfield) {
                this.$toasted.show('You must type something to add a new item!').goAway(2000)
                return
            }
            this.list.push(this.textfield)
            this.textfield = ''
        },
        eraseListElement(index) {
            this.list.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/colors.scss";
  
  .list-container {

  }

</style>