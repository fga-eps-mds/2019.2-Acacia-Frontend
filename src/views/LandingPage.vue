<template>
  <div class="landing-page">
    
    <TopBar 
      iconleft="bars"
      color="color-primary"
      style="background-color: white"
    />

    <BottomBar/>
    
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
import BottomBar from '@/components/layout/BottomBar'

export default {
  components: {
    TopBar,
    BottomBar,
  },

}

</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";


</style>
