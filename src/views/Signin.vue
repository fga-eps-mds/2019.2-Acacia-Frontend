<template>
  <div class="signup">
          
    <TopBar :iconleft="'chevron-left'" />
    <div class="signup-container">
      <div class="content-title">
        <a style="font-size: 40px">{{ $t('SignPages.createAccount') }}</a>
      </div>
      
      <!-- <div class="content-form"> -->
      <form class="signup-form">
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Name"
          dark
          color="lime"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        
        <!-- <TextField
          v-model="username"
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.name')"
        /> -->

        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          dark
          color="lime"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        
        <!-- <TextField
          v-model="email"
          class="mt-2"
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.email')"
        /> -->

        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          dark
          color="lime"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <!-- <TextField
          v-model="password"
          class="mt-3"
          color="white"
          bordercolor="white"
          type="password"
          :label="this.$t('SignPages.password')"
        /> -->
     
        <v-text-field
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          label="Confirm Password"
          type="password"
          dark
          color="lime"
          required
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
        
        <!-- <TextField
          v-model="confirm_password"
          color="white"
          class="mt-3"
          bordercolor="white"
          type="password"
          :label="this.$t('SignPages.confirmPassword')"
        /> -->
      </form>
      <div class="signup-button">
        <SignButton
          class="mt-4"
          :label="this.$t('SignPages.createAccount')"
          @action="signup"
        />
      </div>
    </div>
  </div>
</template>

  <script>
    import TopBar from '@/components/layout/TopBar'
    import TextField from '@/components/input/TextField'
    import SignButton from '@/components/input/SignButton'
    import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
    // import { validationMixin } from 'vuelidate'

    /* External library */
    import axios from "axios";

export default {
      components: {
      TopBar,
      TextField,
      SignButton
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
    confirmPassword: { sameAsPassword: sameAs('password') },
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.minLength && errors.push('Password must be minumum of 8 characters.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAsPassword && errors.push('Puts! Digita a mesma senha!!')
      return errors
    },
  },
  
  methods: {
    // submit () {
    //     this.$v.$touch()
    //   },
    //   clear () {
    //     this.$v.$reset()
    //     this.name = ''
    //     this.email = ''
    //     this.select = null
    //     this.checkbox = false
      // },
    signup() {
      // if (!this.validateInput()) {
      //   return;
      // }
      let data = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      let dataToken = {
        email: this.email,
        password: this.password
      }

      let state = this.$store.state
      let toasted = this.$toasted

      state.noAuthRequest('users/token/', 'POST', data)
        .then((response) => {
          toasted.show(this.$t('SignPages.positiveStatus')).goAway(2000)
          state.authUser(response.data['access'], response.data['refresh'])
          router.push({ name: 'dashboard' })
        })
        .catch(() => {
          toasted.show(this.$t('SignPages.negativeStatus')).goAway(2000)
        })
      //         .catch(error => {
      //           if (error.response.data.email) {
      //       this.$toasted.show(error.response.data.email).goAway(2000);
      //   }
      //           if (error.response.data.username) {
      //       this.$toasted.show(error.response.data.username).goAway(2000);
      //   }
      //           if (error.response.data.password) {
      //       this.$toasted.show(error.response.data.password).goAway(2000);
      //   }
      // });
    },
    //     validateInput() {
    //       if (!this.username) {
    //       this.$toasted.show(this.$t("SignPages.requireName")).goAway(2000);
    //     return false;
    //   }
    //       if (!this.email) {
    //       this.$toasted.show(this.$t("SignPages.requireEmail")).goAway(2000);
    //     return false;
    //   }
    //       if (!this.password) {
    //       this.$toasted.show(this.$t("SignPages.requirePassword")).goAway(2000);
    //     return false;
    //   }
    //       if (this.password.length < 8) {
    //       this.$toasted
    //         .show(this.$t("SignPages.requreValidPassword"))
    //         .goAway(2000);
    //   return false;
    // }
    //       if (this.confirm_password != this.password) {
    //       this.$toasted
    //         .show(this.$t("SignPages.requirePasswordCorrespondance"))
    //         .goAway(2000);
    //   return false;
    // }
    //       let emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    //       if (emailRegex.test(String(this.email).toLowerCase())) {
    //       this.$toasted.show(this.$t("SignPages.requireValidEmail")).goAway(2000);
    //     return false;
    //   }
    //   return true;
    // }
  }
}

</script>

<style lang="scss" scoped>

@import "../assets/stylesheets/colors.scss";

.signup {
  display: flex;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  // align-items: stretch;
  background-image: linear-gradient(
    180deg,
    rgba(86, 163, 166, 1),
    rgba(75, 125, 170, 105)
  );
}

.content-container {
  width: 100%;
  max-width:500px;
  margin: 1px;
  // box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.content-title {
  width: 100%;
  padding: 0px 25px;
  margin-top: 20%;
  margin-bottom: 20%;
  color: $color-default-text;
  display: flex;
  justify-content: left;
}

.content-form {
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  
}

.content-button {
  margin-top: 90px;
}

// .gradient {
//   background-image: linear-gradient(
//     180deg,
//     rgba(86, 163, 166, 1),
//     rgba(75, 125, 170, 105)
//   );
// }
</style>