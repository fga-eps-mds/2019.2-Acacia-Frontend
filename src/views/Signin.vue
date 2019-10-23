<template>
  <div class="signin gradient">
		<TopBar 
      :iconleft="'chevron-left'"
    />
		<div class="content-container">
			<img 
        width="45%" 
        class="max-width-500 mb-4" 
        src="../assets/images/logo.svg">
			<TextField 
        class="mt-5" 
        v-model="email" 
        texticon="user" 
        :placeholder="this.$t('SignPages.email').toLowerCase()"/>
			<TextField 
        class="mt-5" 
        v-model="password" 
        texticon="lock" 
        :placeholder="this.$t('SignPages.password').toLowerCase()" 
        type="password"/>
			<SignButton 
        :label="this.$t('SignPages.login')" 
        class="mt-5" 
        @action="login"/>
    </div>
		<div href="/signup" class="signup-button fixed-bottom">
			<a href="/signup" class="button-link">
        {{ this.$t('SignPages.createAccount') }}
      </a>
		</div>

	</div>
</template>

<script>
/* Component imports */
import TextField from '@/components/input/TextField'
import TopBar from '@/components/layout/TopBar'
import SignButton from '@/components/input/SignButton'

/* Local scripts imports */
import router from '@/router'

export default {
	components: {
		TextField,
		TopBar,
		SignButton
	},
	data() {
		return {
			email: '',
			password: ''
		}
	},
  methods: {
    login() {
      if (!this.validateInput()) {
        return
      }

      let data = {
        email: this.email,
        password: this.password
      }

      let state = this.$store.state
      let toasted = this.$toasted

      state.noAuthRequest('users/token', 'POST', data)
        .then((response) => {
          toasted.show(this.$t('SignPages.positiveStatus')).goAway(2000)
          state.authUser(response.data['access'], response.data['refresh'])
          router.push({ name: 'home' })
        })
        .catch(() => {
          toasted.show(this.$t('SignPages.negativeStatus')).goAway(2000)
        })
    },
    validateInput() {
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

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

	.max-width-500 {
		max-width: 400px;
	}
	.signup-button {
		margin: auto;
		height: 6%;
		width: 100%;
		background-color: $color-primary;
		margin-bottom: 0;
		position: absolute;
		color: $color-default-text;
		font-family: RobotoBold;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.signin {
		width: 100%;
		height: 100%;
		position: absolute;
		margin-top: 0;
		text-align: center;
	}
  .button-link {
    color: $color-default-text;
		font-family: RobotoBold;
    font-size: 130%;
    text-decoration: none;
  }
	.gradient {
		background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75, 125, 170, 105));
	}
</style>
