<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
}
</script>

<style>
html, body {
	margin: 0;
}
#app {
  font-family: Roboto-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* Essas são as fontes utilizadas no projeto */
/* Fontes disponiveis: 
Raleway:
	raleway-bold
	raleway-medium
	raleway-regular
	raleway-light
	raleway-thin		
Roboto:
	roboto-bold
	roboto-medium
	roboto-regular
	roboto-light
	roboto-thin
*/
@font-face {
	font-family: Raleway-Bold;
	src: url('./assets/fonts/Raleway-Bold.ttf');
}
.raleway-bold {
	font-family: Raleway-Bold;
}
@font-face {
	font-family: Raleway-Medium;
	src: url('./assets/fonts/Raleway-Medium.ttf');
}
.raleway-medium {
	font-family: Raleway-Medium;
}
@font-face {
	font-family: Raleway-Regular;
	src: url('./assets/fonts/Raleway-Regular.ttf');
}
.raleway-regular {
	font-family: Raleway-Regular;
}
@font-face {
	font-family: Raleway-Light;
	src: url('./assets/fonts/Raleway-Light.ttf');
}
.raleway-light {
	font-family: Raleway-Light;
}
@font-face {
	font-family: Raleway-Thin;
	src: url('./assets/fonts/Raleway-Thin.ttf');
}
.raleway-thin {
	font-family: Raleway-Thin;
}
@font-face {
	font-family: Roboto-Bold;
	src: url('./assets/fonts/Roboto-Bold.ttf');
}
.roboto-bold {
	font-family: Roboto-Bold;
}
@font-face {
	font-family: Roboto-Medium;
	src: url('./assets/fonts/Roboto-Medium.ttf');
}
.roboto-medium {
	font-family: Roboto-Medium;
}
@font-face {
	font-family: Roboto-Regular;
	src: url('./assets/fonts/Roboto-Regular.ttf');
}
.roboto-regular {
	font-family: Roboto-Regular;
}
@font-face {
	font-family: Roboto-Light;
	src: url('./assets/fonts/Roboto-Light.ttf');
}
.roboto-light {
	font-family: Roboto-Light;
}
@font-face {
	font-family: Roboto-Thin;
	src: url('./assets/fonts/Roboto-Thin.ttf');
}
.roboto-thin {
	font-family: Roboto-Thin;
}
</style>