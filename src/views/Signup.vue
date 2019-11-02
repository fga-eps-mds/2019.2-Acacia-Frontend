<template>
  <div class="signup gradient">
    <TopBar
      :iconleft="'chevron-left'"
    />
    <div class="content-container">
      <div class="content-title">
        <a style="font-size: 40px"> 
          {{ $t('SignPages.createAccount') }} 
        </a>
      </div>
      <div class="content-form">
        <TextField 
          v-model="username" 
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.name')"
          class="mt-2"
        />
        <TextField 
          v-model="email" 
          class="mt-2" 
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.email')"
        />
        <TextField 
          v-model="password" 
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.password')" 
          type="password"
          class="mt-2"
        />
        <TextField 
          v-model="confirm_password" 
          color="white"
          bordercolor="white"
          :label="this.$t('SignPages.confirmPassword')" 
          type="password"
          class="mt-2"
        />
      </div>
      <div class="content-button">
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

/* Local scripts imports */
import router from "@/router"

/* External library */
import axios from "axios"

export default {
  components: {
    TopBar,
    TextField,
    SignButton,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  },
  methods: {
    signup(){
      if (!this.validateInput()) {
        return
      }       
      let data = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password
      }
      let dataToken = {
        email: this.email,
        password: this.password,
      }
      const baseURL = this.$store.state.baseURL;
      axios.post(baseURL + 'users/signup/', data)
        .then(() => {
          axios.post(baseURL + 'users/token/', dataToken)
            .then((response) => {
              this.$store.state.authUser(
                response.data['access'], 
                response.data['refresh']
              );
              this.$toasted.show(this.$t('SignPages.positiveStatus')).goAway(2000)
              router.push({name: 'home'})
            })
            .catch (() => {
              router.push({name: 'signin'})
            })
        })
        .catch((error) => {
          if(error.response.data.email){
            this.$toasted.show(error.response.data.email).goAway(2000)
          }
          if(error.response.data.username){
            this.$toasted.show(error.response.data.username).goAway(2000)
          }
          if(error.response.data.password){
            this.$toasted.show(error.response.data.password).goAway(2000)
          }
        })
    },
    validateInput() {
      if (!this.username) {
        this.$toasted.show(this.$t('SignPages.requireName')).goAway(2000)
        return false
      }
      if (!this.email) {
        this.$toasted.show(this.$t('SignPages.requireEmail')).goAway(2000)
        return false
      }
      if (!this.password) {
        this.$toasted.show(this.$t('SignPages.requirePassword')).goAway(2000)
        return false
      }
      if (this.password.length < 8) {
        this.$toasted.show(this.$t('SignPages.requreValidPassword')).goAway(2000)
        return false
      }
      if (this.confirm_password != this.password) {
        this.$toasted.show(this.$t('SignPages.requirePasswordCorrespondance')).goAway(2000)
        return false
      }
      let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
      if (!this.email.match(emailRegex)) {
        this.$toasted.show(this.$t('SignPages.requireValidEmail')).goAway(2000)
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/stylesheets/colors.scss";

  .content-button {
    margin-top: 90px;
  }

  .content-title {
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 20%;
    color: $color-default-text;
    display: flex;
    justify-content: left; 
  }
  
  .content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

  .signup {
    width: 100%;
		height: 100%;
		position: absolute;
		margin-top: 0;
		text-align: center;
  }

  .gradient {
    background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75, 125, 170, 105));
  }
</style>