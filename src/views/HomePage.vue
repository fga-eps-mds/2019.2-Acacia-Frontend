<template>
  <div class="home">
    <h1 class="raleway-bold"> Essa é a página root </h1>
    <SignButton :label="'Log out'" @action="logout"/>
    <p> {{$t('IWillFurarTheRenato')}} </p>
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
          flag: 'uk', 
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
    }
  }
}
</script>