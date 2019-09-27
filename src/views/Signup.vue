<template>
  <div class="signup gradient">
    <TopBar :iconleft="'chevron-left'"></TopBar>
    <div class="content-container">
      <div class="content-title">
        <h1> Create account </h1>
      </div>
      <div class="content-form">
        <TextField class="mt-3" v-model="username" :label="'Name'"></TextField>
        <TextField class="mt-3" v-model="email" :label="'Email'"></TextField>
        <TextField class="mt-3" v-model="password" :label="'Password'" :password="true"></TextField>
        <TextField class="mt-3" v-model="confirm_password" :label="'Confirm password'" :password="true"></TextField>
      </div>
      <div class="content-button">
        <SignButton class="mt-4" :label="'Sign up'"></SignButton>
      </div>
    </div>

  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import SignButton from '../components/input/SignButton'

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
    }
  }

</script>

<style lang="scss" scoped>
  @import "../assets/stylesheets/colors.scss";

  .content-title {
    width: 100%;
    padding: 0px 20px;
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
    background-image: linear-gradient(180deg, rgba(86, 163, 166, 1), rgba(75s, 125, 170, 105));
  }
</style>