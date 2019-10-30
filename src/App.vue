<template>
  <v-app id="app">
    <!-- Icons from fontawesome -->
    <link
      rel="stylesheet"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >

    <!-- the side bar component is implemented here -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- The view from router is shown here -->
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: true,
      navItems: [
        {title: 'Perfil', icon: 'account-outline'},
        {title: 'Dados Abertos', icon: 'shape-circle-plus'},
        {title: 'Propriedades', icon: 'home-group'},
        {title: 'Colheitas', icon: 'sprout'},
        {title: 'Calendário', icon: 'calendar-blank-outline'},
        {title: 'Dashbooard', icon: 'view-dashboard-outline'},
      ],
    }
  },
  components: {
  },
  mounted() {
    let state = this.$store.state;
    state.resolveUserLanguage();
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