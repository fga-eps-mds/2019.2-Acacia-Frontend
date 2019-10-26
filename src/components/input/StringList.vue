<template>
  <div id="stringlist">
    <div>
      <v-row>
        <v-col cols="10" class="p-0">
          <TextField 
            v-model="textfield"
            color="#949090"
            bordercolor="#C4C4C4" 
          />
        </v-col>
        <v-col 
            cols="2"
            class="p-0"
        >
          <font-awesome-icon
            @click="addNewListElementAndSaveLast"
            class="icon"
            icon="plus" />
        </v-col>
      </v-row>
    </div>
    <div>
      <div 
        v-for="(item, index) in list" 
        :key="item"
        class="row border-bottom m-1" 
      >
        <div 
          class="col-10 text-left" 
          style="font-size: 0.85em;overflow: hidden"
        >
          {{ item }}
        </div>
        <div class="col-2">
          <font-awesome-icon
            @click="eraseListElement(index)"
            class="icon"
            icon="minus"
          />
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
  model: {
    prop: 'list',
    event: 'textfield-change'
  },
  props: {
    list: {
      type: Array,
      default: ''
    },
  },
  data() {
    return {
    textfield: ''
    }
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

    #stringlist{
      padding: 8px 0px !important;
    }

    .icon{
      font-size:15px;
      color: $color-primary !important;
    }

</style>