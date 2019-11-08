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
        :locale="$t('DatePicker.locale')"
        color="#376996"
        :min="validateQuant() ? today : ''"
        :max="validateQuant() ? '' : today"
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
    }
  },
  data: () => ({
    today: new Date().toISOString().slice(0,10),
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
        return this.formatDate(this.date)
    },
  },
  created() {
    this.dateLocal = new Date().toISOString().substr(0, 10)
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    validateQuant() {
      if (this.picked == 'today'){
        return true
      }
      else {
        return false
      }
    }
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
      padding: 10px 65% 0px 20px;
      margin: 1%;
    }

</style>