<template>
  <div id="app">
    <!-- Icons from fontawesome -->
    <link rel="stylesheet" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous">
    <!-- The view from router is shown here -->
    <router-view />
  </div>
</template>

<script>
  import i18n from '@/plugins/i18n'

  export default {
    components: {
    },
    mounted() {

      let state = this.$store.state;

      if (!state.preferedLanguage) {
        state.authRequest(
          'users/prefered-language/',
          'GET'
        )
        .then(res => { 
          let lang = res.data['chosen_language'];
          state.preferedLanguage = lang;
          state.setCookieLanguage(lang); // cookies
        })
        .catch(res => {
          let cookieLang = state.getCookieLanguage()

          if(cookieLang) {
            state.preferedLanguage = cookieLang
          }

          else {
            state.preferedLanguage = state.defaultLanguage;
          }
        })
        .finally(() => {
          i18n.locale = state.preferedLanguage;
        })
      }
    },
    methods: {
    }
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