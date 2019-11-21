<template>
  <div id="stringlist">
    <div>
      <v-row>
        <v-col 
          cols="10"
          class="p-0"
        >
          <v-text-field
            v-model="textfield"
            :error-messages="textfieldErrors"
            label="Rules"
            required
            class="mt-0"
            @input="$v.textfield.$touch()"
            @blur="$v.textfield.$touch()"
          />
        </v-col>
        <v-col 
          cols="2"
          class="p-0"
        >
          <font-awesome-icon
            icon="plus" 
            class="icon mt-5"
            @click="addNewListElementAndSaveLast"
          />
        </v-col>
      </v-row>
    </div>
    <div>
      <div 
        v-for="(item, index) in list" 
        :key="item"
        class="row border-bottom m-1 p-0 ml-0 mr-0" 
      >
        <div 
          class="col-10 text-left" 
          style="font-size: 0.85em;overflow: hidden"
        >
          {{ item }}
        </div>
        <div class="col-2">
          <font-awesome-icon
            icon="minus"
            class="icon"
            @click="eraseListElement(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  model: {
    prop: 'list',
    event: 'textfield-change'
  },
  props: {
    list: {
      type: Array,
      default: () => 1
    },
  },
  data() {
    return {
    textfield: '',
    }
  },
  validations: {
    textfield: { required },
  },
  computed: {
    textfieldErrors () {
      const errors = []
      if (!this.$v.textfield.$dirty) return errors
      !this.$v.textfield.required && errors.push('You must type something to add a new item!.')
      return errors
    },
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
    clearForm() {
        this.$v.$reset()
        this.textfield = ''
    },
    addNewListElementAndSaveLast() {
      this.$v.$touch()
      
      if (this.$v.$invalid) {
        return
      }

      this.list.push(this.textfield)
      this.$v.$reset()
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
      padding: 3px 15px !important;
    }
    .icon{
      font-size:15px;
      color: $color-primary !important;
    }
</style>