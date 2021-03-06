<template>
  <v-navigation-drawer
    v-model="sideNav"
    absolute
    temporary
    class="navigation-drawer"
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
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">
            {{ username }}
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
        <a
          :href="item.link"
          style="color: #ffffff"
        > 
          <v-list-item-content>
            <v-list-item-title v-if="item.title=='profile'">
              {{ profileTranslation }}
            </v-list-item-title>

            <v-list-item-title v-else-if="item.title=='newHarvest'">
              {{ newHarvestTranslation }}
            </v-list-item-title>

            <v-list-item-title v-else-if="item.title=='newTree'">
              {{ newTreetranslation }}
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
          v-for="item in languageOptions"
          :key="item.title"
          class="mt-2"
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
    </v-list>
    
    <template 
      v-if="$store.state.getRefreshToken()"
      v-slot:append
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
export default {
  name: "SideBar",
  data() {
    return {
      navItemsAuth: [
        {title: 'newHarvest', icon: 'mdi-sprout', link: '/harvest/registration'},
        {title: 'newTree', icon: 'mdi-tree', link: '/tree/registration'},
        {title: 'calendar', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'dashboard', icon: 'mdi-view-dashboard-outline', link: '/dashboard'},
      ],
      navItemsNotAuth: [
        {title: 'dashboard', icon: 'mdi-view-dashboard-outline', link: '/dashboard'},
        {title: 'calendar', icon: 'mdi-calendar-blank-outline', link: '/calendar'},
        {title: 'signin', icon: 'mdi-login', link: '/signin'},
        {title: 'signup', icon: 'mdi-account-plus', link: '/signup'},
      ],
      languageOptions: [
        {title: 'Português', flagicon: 'br', language: 'pt'},
        {title: 'English', flagicon: 'ca', language: 'en'},
      ],
      username: '',
    }
  },
  computed: {
    profileTranslation: function() {
      return this.$t('SideBar.profile')
    },

    newHarvestTranslation: function() {
      return this.$t('SideBar.newHarvest')
    },

    newTreetranslation: function() {
      return this.$t('SideBar.newTree')      
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
  },
  mounted() {
    this.getUsername()
  },
  created() {
    this.getUsername()
  },
  methods: {
    async getUsername(){
      const res = await this.$store.state.authRequest('users/profile/', 'GET')
      if (res.data){
        this.username = res.data.username
      }
    },
    logout() {
      if (this.$store.state.getRefreshToken()) {
        this.$store.state.logoutUser()
        window.location.reload()
      }
    },
    changeLocale(locale){
      this.$store.state.setUserLanguage(locale)
    },
  }
}
</script>

<style scoped lang="scss">

  .navigation-drawer{
    z-index: 101 !important;
    height: 100vh;
    position: fixed;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
  }

</style>