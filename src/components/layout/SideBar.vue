<template>
  <v-navigation-drawer
    v-model="sideNav"
    absolute
    temporary
    color="#56A3A6"
  >
    <div
      v-if="$store.state.getRefreshToken()"
    >
      <v-list-item class="mt-4">
        <v-list-item-avatar>
          <v-icon
            large
            color="#ffffff"
          >
            mdi-account-outline
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">
            Username
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div
      v-else
    >
      <v-list-item class="mt-4">
        <v-list-item-avatar>
          <v-icon
            large
            color="#ffffff"
          >
            mdi-account-outline
          </v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </div>

    <v-divider
      class="white"
    />

    <v-list dense>

      <v-list-item
        v-for="item in ($store.state.getRefreshToken() ? navItemsAuth : navItemsNotAuth)"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon 
            v-if="!item.flagicon"
            color="#ffffff"
          >
            {{ item.icon }}
          </v-icon>
          <flag 
            v-else
            :iso="item.flagicon" 
            :squared="false"
          />
        </v-list-item-icon>

        <a :href="item.link" style="color: #ffffff"> 
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }} 
          </v-list-item-title>
        </v-list-item-content>
        </a>
      </v-list-item>
      <v-divider
        class="white"
      />
      
      <a
        style="color: white;"
      >
        {{ this.$t('SideBar.languages') }}
      </a>
      <v-list-item
        class="mt-2"
        v-for="item in languageOptions"
        :key="item.title"
        @click="changeLocale(item.language)"
      >
        <v-list-item-icon>
          <flag
            :iso="item.flagicon" 
            :squared="false"
          />
        </v-list-item-icon>

        <a :href="item.link"> 
        <v-list-item-content>
          <v-list-item-title
            class="white--text"
          >
            {{ item.title }} 
          </v-list-item-title>
        </v-list-item-content>
        </a>
      </v-list-item>
    </v-list>


    
    <template v-slot:append>
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon 
            color="#ffffff"
          >
            mdi-exit-to-app
          </v-icon>
          </v-list-item-icon>

          <a>
            <v-list-item-content>
              <v-list-item-title
                class="white--text"
              >
                Sair
              </v-list-item-title>
            </v-list-item-content>
          </a>
        </v-list-item>
      </v-list>
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
        {title: this.$t('SideBar.profile'), icon: 'mdi-account-outline', link: '/profile'},
        {title: this.$t('SideBar.opendata'), icon: 'mdi-shape-circle-plus', link: '/public-data'},
        {title: this.$t('SideBar.properties'), icon: 'mdi-home', link: '/property'},
        {title: this.$t('SideBar.harvests'), icon: 'mdi-sprout', link: '/harvest'},
        {title: this.$t('SideBar.calendar'), icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: this.$t('SideBar.dashboard'), icon: 'mdi-view-dashboard-outline', link: '/'},
      ],
      navItemsNotAuth: [
        {title: this.$t('SideBar.dashboard'), icon: 'mdi-view-dashboard-outline', link: '/'},
        {title: this.$t('SideBar.calendar'), icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: this.$t('SideBar.opendata'), icon: 'mdi-shape-circle-plus', link: '/public-data'},
        {title: this.$t('SideBar.signin'), icon: 'mdi-login', link: '/signin'},
        {title: this.$t('SideBar.signup'), icon: 'mdi-account-plus', link: '/signup'},
      ],
      languageOptions: [
        {title: this.$t('SideBar.english'), flagicon: 'us', language: 'en'},
        {title: this.$t('SideBar.portuguese'), flagicon: 'br', language: 'pt'},
      ]
    }
  },
  methods: {
    logout() {
      this.$store.state.logoutUser()
      window.location.reload()
    },
    changeLocale(locale){
      this.$store.state.setUserLanguage(locale)
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
    },

    sideNavAuth: {
      get: function() {
        return this
      },
      set: function(value) {

      },
    },

    sideNavNotAuth: {
      get: function() {

      },
      set: function(value) {

      },
    }
  }
}
</script>
