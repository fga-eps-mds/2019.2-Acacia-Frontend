<template>
  <div
    class="container"
  >
    <h4>
      {{ ("0" + weekDays[index]).slice(-2) }}
    </h4>
    <h5>  
      {{ weekMonth[index] }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      default: 0,
      type: Number,
    },
  },

  data: () => ({
    weekDays: [],
    weekMonth: [],
  }),

  created() {
    this.generateWeekDays();
  },

  methods: {
    generateWeekDays() {
      let dateListDay = [];
      let dateListMonth = [];
      let today = new Date();
      let dayInMyliSeconds = 1000 * 60 * 60 * 24;

      for (let i=0; i<7; i++) {
        let dateString = today.toISOString().slice(0,10);
        dateListDay.push(today.getDate().toString())
        dateListMonth.push(this.translateMonths(today.getMonth()))
        today.setTime(dayInMyliSeconds + today.valueOf());
      }

      this.weekDays = dateListDay;
      this.weekMonth = dateListMonth;

      return 
    },

    translateMonths(value) {
      switch(value) {
        case 0:
          return this.$t('Dashboard.jan')
        break

        case 1:
          return this.$t('Dashboard.feb')
        break

        case 2:
          return this.$t('Dashboard.mar')
        break

        case 3:
          return this.$t('Dashboard.apr')
        break

        case 4:
          return this.$t('Dashboard.may')
        break

        case 5:
          return this.$t('Dashboard.jun')
        break

        case 6:
          return this.$t('Dashboard.jul')
        break

        case 7:
          return this.$t('Dashboard.aug')
        break

        case 8:
          return this.$t('Dashboard.sep')
        break

        case 9:
          return this.$t('Dashboard.oct')
        break

        case 10:
          return this.$t('Dashboard.nov')
        break

        case 11:
          return this.$t('Dashboard.dec')
        break

        default:
          return "ERROR"
        break
      } 
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/colors.scss";

  .container {
    height: 150px;
    width: 285px;
    border-radius: 12px;
    background: #56A3A6;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  h4 {
    color: $color-default-text;
  }

  h5 {
    color: $color-default-text;
  }

</style>