 
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
        <v-text-field 
          v-model="email"
          class="mt-10"
          prepend-icon="mdi-account"
          :error-messages="emailErrors"
          label="E-mail"
          dark
          color="light-green accent-3"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-text-field 
          v-model="password"
          class="mt-3"
          :error-messages="passwordErrors"
          prepend-icon="mdi-lock"
          label="Senha"
          dark
          color="light-green accent-3"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          required
          @click:append="showPassword = !showPassword"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />
      </form>

      <SignButton 
        class="signin-button"
        :label="this.$t('SignPages.login')" 
        @action="login"
      />
    </div>
    <Snackbar @reset="clearForm" />
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
import TopBar from '@/components/layout/TopBar'
import SignButton from '@/components/input/SignButton'
import { email, minLength, required } from 'vuelidate/lib/validators'
import Snackbar from '@/components/input/Snackbar.vue'

const touchMap = new WeakMap()

export default {
	components: {
		TopBar,
    SignButton,
    Snackbar,
  },
  
	data() {
		return {
			email: '',
      password: '',
      showPassword: false
		}
  },
  
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors
        .push('Must be valid e-mail')
      !this.$v.email.required && errors
        .push('Email must be filled.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors
        .push('Password must be minumum of 8 characters.')
      !this.$v.password.required && errors
        .push('Password must be filled.')
      return errors
    },
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
        return
      }
      let data = {
        email: this.email,
        password: this.password
      }
             
      this.$http.post('users/token/', data)
        .then((response) => {
          this.$store.state.authUser(
            response.data["access"],
            response.data["refresh"]
          );
          this.$store.commit('snackbar/showMessage', {
            message: this.$t('SignPages.positiveStatus'),
            color: 'success',
          })    
          setTimeout(() => {
            this.$router.push({ name: "dashboard" })
          }, 2000); 
        })
        .catch((error) => {
          this.$store.commit('snackbar/showMessage', {
            message: this.$t('SignPages.negativeStatus'),
            color: 'error',
          })
        })
        .finally(() => {
          setTimeout(() => {
             this.clearForm()
          }, 2000)
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
  padding: 2.5%;
}

.gradient {
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}

</style>