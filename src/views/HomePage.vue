<template>
  <div class="home">
    <h1 class="raleway-bold"> Essa é a página root </h1>
		<p>/signin - para a página de autenticação</p>
		<p>/signup - para a página de registro</p>
    <SignButton :label="'Log out'" @action="logout"/>
    <SignButton :label="'Sign in'" @action="router.push({name: 'signin'})"/>
    <SignButton :label="'Sign up'" @action="router.push({name: 'signup'})"/>
    <div class="mt-3">
      <p>Tokens de autenticação JWT</p>
      <p>Access token: {{ this.$store.getters.getAccessToken }} </p>
      <p>Refresh token: {{ this.$store.getters.getRefreshToken }} </p>
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