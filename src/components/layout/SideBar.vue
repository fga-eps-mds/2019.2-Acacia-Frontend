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
          <v-list-item-title v-if="item.title=='profile'">
            {{ profileTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='opendata'">
            {{ openDataTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='properties'">
            {{ propertiesTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='harvests'">
            {{ harvestsTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='calendar'">
            {{ calendarTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='dashboard'">
            {{ dashboardTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='signin'">
            {{ signinTranslation }}
          </v-list-item-title>

          <v-list-item-title v-else-if="item.title=='signup'">
            {{ signupTranslation }}
          </v-list-item-title>

        </v-list-item-content>
        </a>
      </v-list-item>

      <v-divider
        class="white"
      />
      <!---->
      <v-list-group>
        <template 
          v-slot:activator
          color="#ffffff"
          class="white--text"  
        >
          <v-list-item-title 
            class="white--text"
          >
            {{ languegeTranslation }}
          </v-list-item-title>
        </template>
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
      </v-list-group>











      <!--
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
      -->
    </v-list>
    
    <template 
      v-slot:append
      v-if="$store.state.getRefreshToken()"
    >
      <v-list dense>
        <v-list-item
          @click="logout()"
        >
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
                {{ exitTranslation }}
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
        {title: 'profile', icon: 'mdi-account-outline', link: '/profile'},
        {title: 'opendata', icon: 'mdi-shape-circle-plus', link: '/public-data'},
        {title: 'properties', icon: 'mdi-home', link: '/property'},
        {title: 'harvests', icon: 'mdi-sprout', link: '/harvest'},
        {title: 'calendar', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
      ],
      navItemsNotAuth: [
        {title: 'dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
        {title: 'calendar', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'opendata', icon: 'mdi-shape-circle-plus', link: '/public-data'},
        {title: 'signin', icon: 'mdi-login', link: '/signin'},
        {title: 'signup', icon: 'mdi-account-plus', link: '/signup'},
      ],
      languageOptions: [
        {title: 'Português', flagicon: 'br', language: 'pt'},
        {title: 'Inglês', flagicon: 'us', language: 'en'},
      ],
    }
  },
  methods: {
    logout() {
      if (this.$store.state.getRefreshToken()) {
        this.$store.state.logoutUser()
        window.location.reload()
      }
    },
    changeLocale(locale){
      this.$store.state.setUserLanguage(locale)
    },
  },
  computed: {
    profileTranslation: function() {
      return this.$t('SideBar.profile')
    },

    openDataTranslation: function() {
      return this.$t('SideBar.opendata')
    },

    propertiesTranslation: function() {
      return this.$t('SideBar.properties')
    },

    harvestsTranslation: function() {
      return this.$t('SideBar.harvests')
    },

    calendarTranslation: function() {
      return this.$t('SideBar.calendar') 
    },

    dashboardTranslation: function() {
      return this.$t('SideBar.dashboard')
    },

    signinTranslation: function() {
      return this.$t('SideBar.signin')
    },

    signupTranslation: function() {
      return this.$t('SideBar.signup')
    },

    languegeTranslation: function() {
      return this.$t('SideBar.languages') 
    },

    exitTranslation: function() {  
      return this.$t('SideBar.exit')
    },

    sideNav: {
      get: function() {
        return this.$store.state.sideBarOn

      },
      set: function(value) {
        this.$store.state.sideBarOn = value
      },
    },
  }
}
</script>
