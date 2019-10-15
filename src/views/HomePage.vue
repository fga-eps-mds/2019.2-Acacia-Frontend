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
    <button @click="func"> TA BOM
    </button>
  </div>
</template>

<script>
import SignButton from '../components/input/SignButton'
import router from '../router'
import i18n from '@/plugins/i18n'

export default {
  name: 'home',
  components: {
    SignButton
  },
  data() {
    return {
      router,
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
    changeLocale(locale){
      i18n.locale = locale
    },
    func()
    {
      this.$store.getters.noAuthRequest("http://0.0.0.0:8080/users/signup")
          .then(response => {
            console.log(response)
          })
    }
  }
}
</script>