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
  </div>
</template>

<script>
import SignButton from '../components/input/SignButton'
import router from '../router'
export default {
  name: 'home',
  components: {
    SignButton
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
      this.$store.state.setUserLanguage(locale)
    },

  }
}
</script>