<template>
  <v-navigation-drawer
    v-model="sideNav"
    absolute
    temporary
    class="navigation-drawer"
  >
    <v-list-item class="mt-4">
      <v-list-item-avatar>
        <v-img src="https://secure.gravatar.com/avatar/d39c7a53f244da29da3cd8ccaad6be4c?s=800&d=identicon"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Renato, o lindão</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>

      <v-list-item
        v-for="item in ($store.state.getRefreshToken() ? navItemsAuth : navItemsNotAuth)"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <a :href="item.link" class="text-dark"> 
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }} 
          </v-list-item-title>
        </v-list-item-content>
        </a>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div>
        <SignButton
          v-if="$store.state.getRefreshToken()"
          label="Logout"
          @action="logout"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import SignButton from '@/components/input/SignButton'
export default {
  name: "SideBar",
  components:{
    SignButton
  },
  data() {
    return {
      navItemsAuth: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
        {title: 'Calendário', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'Propriedades', icon: 'mdi-home', link: '/property'},
        {title: 'Meu Perfil', icon: 'mdi-account-outline', link: '/profile'},
        {title: 'Colheitas', icon: 'mdi-sprout', link: '/harvest'},
        {title: 'Dados Abertos', icon: 'mdi-shape-circle-plus', link: '/public-data'},
      ],
      navItemsNotAuth: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
        {title: 'Calendário', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'Dados Abertos', icon: 'mdi-shape-circle-plus', link: '/public-data'},
        {title: 'Login', icon: 'mdi-login', link: '/signin'},
        {title: 'Registro', icon: 'mdi-account-plus', link: '/signup'},
      ],
    }
  },
  methods: {
    logout() {
      this.$store.state.logoutUser()
      window.location.reload()
    },
  },
  computed: {
    sideNav: {
      get: function() {
        return this.$store.state.sideBarOn

      },
      set: function(value) {
        this.$store.state.sideBarOn = value
      },
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/colors.scss";

.navigation-drawer {
  background-color: black;
  background: black;
}

</style>