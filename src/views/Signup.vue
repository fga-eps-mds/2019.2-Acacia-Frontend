<template>
  <div class="signup gradient">
    <TopBar :iconleft="'chevron-left'" />
    <div class="signup-container">
      <div class="signup-title raleway-thin">
        <a>{{ $t('SignPages.createAccount') }}</a>
      </div>
     
      <form class="signup-form">
        <v-text-field
          v-model.lazy="username"
          :error-messages="usernameErrors"
          label="Name"
          dark
          color="light-green accent-3"
          clearable
          required
          @keydown="isUniqueUsername=''"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        />

        <v-text-field
          v-model.lazy="email"
          :error-messages="emailErrors"
          label="E-mail"
          dark
          color="light-green accent-3"
          clearable
          required
          @keydown="isUniqueEmail=''"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        
        <v-text-field
          v-model.lazy="password"
          :error-messages="passwordErrors"
          label="Password"
          dark
          color="light-green accent-3"      
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          required
          @click:append="showPassword = !showPassword"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />

        <v-text-field
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          label="Confirm Password"
          dark
          color="light-green accent-3"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          required
          @click:append="showPassword = !showPassword"
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
        showPassword: false,
        confirmPassword: '',
        isUniqueEmail: '',
        isUniqueUsername: '',
      }
    },
    validations: {
      username: { 
        required, 
        isUnique(){
          if (this.isUniqueUsername === '') return true
           else return false          
        }
      },  
      email: { 
        required, 
        email,
        isUnique(){
          if (this.isUniqueEmail === '') return true
          else return false  
        }
      },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors
          .push('Name must be filled.')
        !this.$v.username.isUnique && errors
          .push('This username is already registered')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors
          .push('Must be valid e-mail')
        !this.$v.email.required && errors
          .push('E-mail must be filled')
        !this.$v.email.isUnique && errors
          .push('This Email is already registered')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors
          .push('Password must be filled.')
        !this.$v.password.minLength && errors
          .push('Password must be minumum of 8 characters.')
        return errors
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors
          .push(' Confirm Password must be filled.')
        !this.$v.confirmPassword.sameAsPassword && errors
          .push('Passwords must be identical.')
        return errors
      },
    },
    
    methods: {
      clearForm () {
        this.$v.$reset()
        this.username = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = '',
        this.isUniqueEmail = ''
        this.isUniqueUsername = ''
      },
      clearError () {
        this.isUniqueEmail = ''
        this.isUniqueUsername = ''
      },
      signup() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return
        }
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
        // const baseURL = this.$store.state.baseURL;
        // axios.post(baseURL + "users/signup/", data)
        
        this.$http.post('users/signup/', data)
          .then(() => {
            this.$store.commit('snackbar/showMessage', {
              message: this.$t('SignPages.positiveStatus'),
                color: 'success',
            })
            this.$http.post('users/token/', data)
              .then(response => {
                this.$store.state.authUser(
                  response.data["access"],
                  response.data["refresh"]
                );
                this.$store.commit('snackbar/showMessage', {
                  message: 'Account successfully created',
                  color: 'success',
                })    
                setTimeout(() => {
                  this.clearForm
                  this.$router.push({ name: "dashboard" })
                }, 2000); 
              })
              .catch((error) => {
                this.$store.commit('snackbar/showMessage', {
                  message: 'There was a problem signing in to your account',
                  color: 'error',
                })
                setTimeout(() => {
                  this.$router.push({ name: "signin" })
                }, 2000); 
              })
          })
          .catch(error => {
            if (error.response.data.email) {
              this.isUniqueEmail = error.response.data.email[0]
            } 
            if (error.response.data.username) {
              this.isUniqueUsername = error.response.data.username[0]
            }
            this.$store.commit('snackbar/showMessage', {
              message: 'There was a problem create account',
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
  margin-top: 15%;
  margin-bottom: 15%;
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
  margin-top: 5%;
  padding-bottom: 30px;
  margin-bottom: auto;
}
.gradient {
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}
</style>