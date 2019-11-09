 
<template>
  <div class="signin gradient">
    <TopBar 
      iconleft="chevron-left"
    />
    <div class="signin-container">
      <img 
        width="45%" 
        class="max-width-500 mb-4" 
        src="../assets/images/logo.svg"
      >
      
      <form class="signin-form">
        <v-text-field class="mt-10"
          prepend-icon="mdi-account"
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          dark
          color="indigo darken-4"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-text-field class="mt-3"
            v-model="password"
            :error-messages="passwordErrors"
            prepend-icon="mdi-lock"
            label="Senha"
            dark
            color="indigo darken-4"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
      </form>

      <SignButton class="signin-button"
        :label="this.$t('SignPages.login')" 
        @action="login"
      />
    </div>

    <div
      href="/signup"
      class="fixed-bottom"
    >
      <a
        href="/signup"
        class="button-link"
      >
        {{ this.$t('SignPages.createAccount') }}
      </a>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/input/TextField'
import TopBar from '@/components/layout/TopBar'
import SignButton from '@/components/input/SignButton'
import { email, minLength } from 'vuelidate/lib/validators'

const touchMap = new WeakMap()

export default {
	components: {
		TextField,
		TopBar,
		SignButton
  },
  
	data() {
		return {
			email: '',
      password: '',
      showPassword: false
		}
  },
  
  validations: {
    email: { email },
    password: { minLength: minLength(8) },
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be minumum of 8 characters.')
      return errors
    }
  },

  methods: {
    clearForm () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    },

    delayTouch($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },

    login() {
      this.$v.$touch();
      
      if (this.$v.$invalid) {
        console.log("formulario inválido")
        return
      }
      console.log("formulario válido")
      let data = {
        email: this.email,
        password: this.password
      }
      let state = this.$store.state
      let toasted = this.$toasted
      
      state.noAuthRequest('users/token/', 'POST', data)
        .then((response) => {
          // toasted.show(this.$t('SignPages.positiveStatus')).goAway(2000)
          state.authUser(response.data['access'], response.data['refresh'])
          router.push({ name: 'dashboard' })
        })
        .catch(() => {
          // toasted.show(this.$t('SignPages.negativeStatus')).goAway(2000)
          // The email and password you entered don't match
        })
    },
  }
}
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

.max-width-500 {
    max-width: 400px;
}

.signin {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.signin-container{
  width: 100%;
  max-width:500px;
  margin: 1px;
}

.signin-title {
  width: 100%;
  padding: 0px 25px;
  margin-top: 40%;
  margin-bottom: 20%;
  display: flex;
  justify-content: left;
  font-size: 35px;
  font-weight: bold;
  color: $color-default-text;
}

.signin-form {
  width: 100%;
  padding-right: 40px;
  padding-left: 30px;
  margin-right: auto;
  margin-left: auto;
}

.signin-button {
  margin-top: 70px;
  margin-bottom: 0;
  color: $color-default-text;
  font-family: RobotoBold;
}

.button-link {
  background-color: $color-primary;
  color: $color-default-text;
  font-family: RobotoBold;
  font-size: 130%;
  text-decoration: none;
  display: block;
}

.gradient {
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}

</style>