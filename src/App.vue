<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	components: {
	}
}
</script>

<style lang="scss">
@import "./assets/stylesheets/colors.scss";
@import "./assets/stylesheets/typography.scss";
@import "./assets/stylesheets/helpers.scss";
</style>

<style>
html {
	margin: 0;
}
body {
	margin: 0;
}
#app {
	font-family: Roboto-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>