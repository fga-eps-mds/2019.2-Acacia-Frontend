<template>
  <div
  >
    <div class="p-3 mt-5">
      
      <h1 class="raleway-regular mb-5">Dashboard</h1>
      <v-window 
      v-model="step" 
      class="window-container"
      >
        <v-window-item 
          v-for="n in 7"
          :key="n"
          :value="n"
        >
          <WeeklyCard
            :date="'0' + n.toString() + '/03/2019'"
          />
        </v-window-item>
      </v-window>
    </div>
    <div
      class="p-3 card-container"
    >
      <Card
        v-model="window"
      />
    </div>
  </div>
</template>

<script>
/* Component imports */
import router from '@/router'
import WeeklyCard from '../components/layout/WeeklyCard'
import Card from '../components/layout/Card'

export default {
  name: 'Home',
  components: {
    WeeklyCard,
    Card,
  },
  data: () => ({
      step: 1,
      length: 3,
      window: 0,
    }),
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

.diva {
  margin: 10px;
  background-color: $color-secundary;
  color: white;
  border-radius: 10px !important;
}

.window-container {
  overflow: hidden;
}

.card-container {
  margin-top: 15px;
  padding: 5%;
  
}

</style>
