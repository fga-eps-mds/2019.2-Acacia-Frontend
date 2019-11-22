<template>
  <div>
    <TopBar
      iconleft="bars"
      color="#2D9CDB"
    />
    <div class="p-3 mt-5">
      <h1 class="title-content mb-5 roboto-regular">
        {{ this.$t('Dashboard.weekly') }}
      </h1>
      <v-window 
        v-model="step"
        dark
        class="window-container"
        show-arrows
        next-icon="mdi-chevron-right"
        style="widht:100%"
      >
        <v-window-item 
          v-for="n in 7"
          :key="n"
          :value="n"
        >
          <WeeklyCard
            :index="n-1"
          />
        </v-window-item>
      </v-window>
    </div>
    <div
      class="p-3 card-container"
    >
      <HarvestCard
        v-model="window"
      />
    </div>
  </div>
</template>

<script>
/* Component imports */
import router from '@/router'
import WeeklyCard from '@/components/layout/WeeklyCard'
import HarvestCard from '@/components/layout/HarvestCard'
import TopBar from '@/components/layout/TopBar'

export default {
  name: 'Home',
  components: {
    WeeklyCard,
    HarvestCard,
    TopBar,
  },
  
  data: () => ({
    step: 1,
    length: 3,
    window: 0,
  }),
}
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/colors.scss";

  .window-container {
    overflow: hidden;
  }

  .card-container {
    margin-top: 15px;
    padding: 5%;

  }

  .title-content {
    font-size: 30px;
    text-align: left;
    color: #2D9CDB;
    margin-left: 10px;
    margin-top: 20px;
  }
</style>
  