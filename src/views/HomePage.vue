<template>
  <div class="home">
    <h1 class="raleway-bold">
      {{ $t('RootPage.title') }}
    </h1>
    <SignButton
      :label="$t('SignPages.logout')"
      @action="logout"
    />
    <div>
      <button 
        v-for="entry in languages" 
        :key="entry.title" 
        @click="changeLocale(entry.language)"
      >
        <flag 
          :iso="entry.flag" 
          :squared="false" 
        />

        {{ entry.title }}
      </button>
    </div>
  </div>
</template>

<script>
import SignButton from '@/components/input/SignButton'
import router from '@/router'
export default {
  name: 'Home',
  components: {
    SignButton,
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
      this.$store.state.logoutUser()
      window.location.reload()
    },
    changeLocale(locale){
      this.$store.state.setUserLanguage(locale)
    },
  }
}
</script>