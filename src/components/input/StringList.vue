<template>
    <div id="stringlist">
        <div class="mb-3">
            <v-row>
                <v-col cols="10" class="p-0">
                    <TextField 
                        color="black"
                        class="mr-3"  
                        v-model="textfield"/>
                </v-col>
                <v-col cols="2" class="p-0">
                    <font-awesome-icon
                        class="mt-2"
                        @click="addNewListElementAndSaveLast"
                        icon="plus" 
                        style="color:black"/>
                </v-col>
            </v-row>
        </div>
        <div class="bg-light">
          <div class="row p-1 border-bottom m-1" v-for="(item, index) in list" :key="item">
              <div class="col-10 text-left" style="font-size: 0.85em;overflow: hidden">
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

</style>