<template>
  <div class="signup gradient">
    <TopBar :iconleft="'chevron-left'" />
    <div class="signup-container">
      <div class="signup-title raleway-thin">
        <a>{{ $t('SignPages.createAccount') }}</a>
      </div>
     
      <form class="signup-form">
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Name"
          dark
          color="light-green accent-3"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        />

        <v-text-field
          v-model="email"
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
          :error-messages="passwordErrors"
          label="Password"
          dark
          color="light-green accent-3"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />

        <v-text-field
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          label="Confirm Password"
          type="password"
          dark
          color="light-green accent-3"
          required
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        />
      </form>
        
      <div class="signup-button">
        <SignButton
          class="mt-4"
          :label="this.$t('SignPages.createAccount')"
          @action="signup"
        />
      </div>
      <Snackbar @reset="clearForm" />
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/layout/TopBar.vue'
  import SignButton from '@/components/input/SignButton.vue'
  import Snackbar from '@/components/input/Snackbar.vue'
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

  import axios from "axios";

  export default {
    components: {
    TopBar,
    SignButton,
    Snackbar,
    },
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    validations: {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors
          .push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors
          .push('Must be valid e-mail')
        !this.$v.email.required && errors
          .push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors
          .push('Password is required.')
        !this.$v.password.minLength && errors
          .push('Password must be minumum of 8 characters.')
        return errors
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors
          .push(' Confirm Password is required.')
        !this.$v.confirmPassword.sameAsPassword && errors
          .push('Your password and confirmation password do not match.')
        return errors
      },
    },
    
    methods: {
      clearForm () {
        this.$v.$reset()
        this.username = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
      },
      signup() {
        this.$v.$touch();
      
        if (this.$v.$invalid) {
          console.log("formulario inválido")
          return
        }
        console.log("formulario válido")
        let data = {
          email: this.email,
          username: this.username,
          password: this.password,
          confirm_password: this.confirmPassword
        }
        let dataToken = {
          email: this.email,
          password: this.password
        }
        const baseURL = this.$store.state.baseURL;
        axios.post(baseURL + "users/signup/", data)
          .then(() => {
            this.$store.commit('snackbar/showMessage', {
                message: 'Account successfully created',
                color: 'success',
            })

            axios.post(baseURL + "users/token/", dataToken)
              .then(response => {
                this.$store.commit('snackbar/showMessage', {
                  message: this.$t('SignPages.positiveStatus'),
                  color: 'error',
                })    
                this.$store.state.authUser(
                  response.data["access"],
                  response.data["refresh"]
                );
                this.$router.push({ name: "dashboard" })
              })
              .catch((error) => {
                console.log(error)
                this.$store.commit('snackbar/showMessage', {
                  message: '1There was a problem signing in to your account',
                  color: 'error',
                })
                this.$router.push({ name: "signin" })
              })
          })
          .catch((error) => {
            console.log(error)
            this.$store.commit('snackbar/showMessage', {
              message: '2There were problems creating your account',
              color: 'error',
            })          
          })
      },
    },  
  }
</script>

<style lang="scss" scoped>

@import "../assets/stylesheets/colors.scss";

.signup {
  display: flex;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
}

.signup-container{
  width: 100%;
  max-width:500px;
  margin: 1px;
}

.signup-title {
  width: 100%;
  padding: 0px 25px;
  margin-top: 20%;
  margin-bottom: 20%;
  display: flex;
  justify-content: left;
  font-size: 35px;
  font-weight: bold;
  color: $color-default-text;
}

.signup-form {
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
  margin-right: auto;
  margin-left: auto;
}

.signup-button {
  margin-top: 90px;
}
.gradient {
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}
</style>