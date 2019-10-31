<template>
  <v-app id="app">
    <!-- Icons from fontawesome -->
    <link
      rel="stylesheet"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >

    <!-- the side bar component is implemented here -->
    <SideBar/>

    <!-- The view from router is shown here -->
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
import SideBar from '@/components/layout/SideBar'
export default {
  components: {
    SideBar
  },
  mounted() {
    let state = this.$store.state;
    state.resolveUserLanguage();
  },
}
</script>

<style lang="scss">
  @import "./assets/stylesheets/colors.scss";
  @import "./assets/stylesheets/typography.scss";
  @import "./assets/stylesheets/helpers.scss";
</style>

<style>
  html {
    margin: 0;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: RobotoRegular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
</style>