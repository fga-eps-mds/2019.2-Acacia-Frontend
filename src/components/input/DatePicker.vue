<template>
  <div class="container-date-picker">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="computedDateFormatted"
          :label="label"
          persistent-hint
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="dateLocal"
        :type="type"
        :locale="$t('DatePicker.locale')"
        color="#376996"
        :min="min ? today() : ''"
        :max="max ? today() : ''"
        :multiple="multiple"
        class="date-picker"
        scrollable
      >
        <v-spacer />
        <v-btn
          color="#376996"
          class="date-picker-button"
          @click="modal = false"
        >
          {{ $t('DatePicker.cancel') }}
        </v-btn>
        <v-btn
          color="#376996"
          class="date-picker-button"
          @click="$refs.dialog.save(date)"
        >
          {{ $t('DatePicker.confirm') }}
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'date',
    event: 'datepicker-change'
  },
  props: {
    date: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    picked: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    min: {
      type: Boolean,
      default: false
    },
    max: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    modal: false,
  }),
  computed: {
    dateLocal: {
      get: function() {
          return this.date
      },
      set: function(value) {
          this.$emit('datepicker-change', value)
      }
    },
    computedDateFormatted () {
        return this.formatDate(this.dateLocal)
    },
  },
  created() {
    if(this.type === 'date'){
      this.dateLocal = new Date().toISOString().substr(0, 10)
    }
    else{
      this.dateLocal = ''
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      if(this.type === 'date'){
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      } else{
        let month = new Date(date).getMonth()
        return "January"
      }
    },
    today (){
      return this.min ? new Date().toISOString().slice(0,10) : undefined
    },
  },
}
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";

    .date-picker-button {
      color: white !important;
      font-size: 12px;
      margin: 0px 5px 5px 0px;
      padding: 0px 12px !important;
      border-radius: 10px !important;
      background-color: $color-primary;
    }

    .date-picker {
      border-radius: 12px !important;
    }

    .container-date-picker {
      font-size: 12px;
      padding: 10px 65% 0px 0px;
    }

</style>
