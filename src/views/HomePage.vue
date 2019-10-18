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

    changeLanguage() {
      this.$store.state.authRequest('users/prefered-language/', 'PATCH', { "chosen_language" : this.lang })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    
    getLanguage() {
      this.$store.state.authRequest('users/prefered-language/', 'GET')
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