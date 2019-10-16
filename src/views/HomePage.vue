<template>
  <div class="home">
    <h1 class="raleway-bold"> {{ $t('RootPage.title') }} </h1>
    <SignButton :label="$t('SignPages.logout')" @action="logout"/>
    <div>
      <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared=false />
        {{entry.title}}
      </button>
    </div>
    <div class="bg-dark p-1">
      <TextField v-model="lang" :label="'Your choosen language (2 characters long max)'" :color="'black'"/>
    </div>
    <button @click="changeLanguage">
      Change your language in server
    </button>
    <button @click="getLanguage">
      Get your language from server
    </button>
    <button @click="testAccessToken">
      Test access token
    </button>
    <button @click="destroyAccessToken">
      Destroy access token
    </button>
    <div class="bg-dark p-1">
      <TextField v-model="lang" :label="'Your choosen language (2 characters long max)'" :color="'black'"/>
    </div>
    <button @click="changeLanguage">
      Change your language in server
    </button>
    <button @click="getLanguage">
      Get your language from server
    </button>
  </div>
</template>

<script>
import SignButton from '../components/input/SignButton'
import TextField from '../components/input/TextField'
import router from '../router'
import axios from 'axios'
import i18n from '@/plugins/i18n'
export default {
  name: 'home',
  components: {
    SignButton,
    TextField
  },
  data() {
    return {
      router,
      lang: 'es',
      languages: [
        {
          flag: 'ca', 
          language: 'en',
          title: 'English',
        },
        {
          flag: 'br', 
          language: 'pt',
          title: 'Português',
        },
      ]
    }
  },
  methods: {
    logout() {
      this.$store.commit('logoutUser')
      window.location.reload()
    },
<<<<<<< fb7b563d6e3a5edbc04285af6620d24e9c8c28cf
    testAccessToken() {
      this.$store.state.testAndRefreshAccessToken()
        .then(() => this.$toasted.show('Access token is ok').goAway(2000))
        .catch(() => {
          this.$toasted.show('You must login again').goAway(2000)
          this.$router.push('signin')
        })
    },
    destroyAccessToken() {
      this.$store.state.accessToken = 'batata'
    },
=======
>>>>>>> #40 Fix token expiration time
    changeLanguage() {
      this.$store.state.authRequest('users/set-prefered-language', 'post', { "chosen_language" : this.lang })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLanguage() {
<<<<<<< fb7b563d6e3a5edbc04285af6620d24e9c8c28cf
      this.$store.state.authRequest('users/get-prefered-language', 'post', {})
=======
      this.$store.state.authRequest('users/get-prefered-language', 'post')
>>>>>>> #40 Fix token expiration time
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeLocale(locale){
      i18n.locale = locale
    },

  }
}
</script>