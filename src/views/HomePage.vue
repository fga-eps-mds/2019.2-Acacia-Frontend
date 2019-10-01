<template>
  <div class="home">
    <h1 class="raleway-bold"> Essa é a página root </h1>
    <SignButton :label="'Log out'" @action="logout"/>
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
      router
    } 
  },
  methods: {
    logout() {
      this.$store.commit('logoutUser')
      window.location.reload()
    }
  }
}
</script>