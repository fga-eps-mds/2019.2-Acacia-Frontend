<template>
  <div class="tree">
      <div class="tree-container">
          <h1>Cadastro de Árvore</h1> 

          <div class="tree-form">
            <TextField color="black" class="mt-3" v-model="cep" :label="'Espécie'"></TextField>
            <TextField color="black" class="mt-3" v-model="state" :label="'Aultura minina dos futros'"></TextField>
            <TextField color="black" class="mt-3" v-model="city" :label="'Numero de árvores'"></TextField>
            <TextField color="black" class="mt-3" v-model="district" :label="'Possivel data de Colheita'"></TextField>
            <label for="File">Propriedade </label>
          </div>               

          <div class="img-propriedade">

          </div>

          <div class="tree-button">
            <SignButton class="mt-4 mb-3" :label="'Cadastrar'" @action="register"/>
          </div>
      </div>
  </div>
</template>

<script>
  import TopBar from '@/components/layout/TopBar'
  import TextField from '@/components/input/TextField'
  import SignButton from '@/components/input/SignButton'

  export default {
components: { TopBar, TextField, SignButton },

    data() {
      return {
        tree: {},
      }
    },
    methods: {
      goHomePage() {
        this.$router.push('/')
        }
      },
  }

</script>

<style scoped lang="scss">
@import "@/assets/stylesheets/colors.scss";

	.tree {
    height: 100%;
    width: 100%;
		display: flex;
		justify-content: center;
		justify-items: center;
	}
  .tree-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 350px;
      padding: 10px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  .tree-container h1{
    color: $color-primary-text-title;
    font-size: 1.9rem;
    padding: 5px 5px;
    margin-bottom: 40px;
    margin-right: 40px;
    margin-top: 70px;
	}
 .img-propriedade {
      border: 4px;
      width: 300px;
      height: 200px;
      padding: 10px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  }
	.tree-button {
		margin: auto;
		height: 6%;
		width: 80%;
		margin-bottom: 40px;
		margin-left: 110px;

		color: $color-default-text;
		font-family: RobotoBold;
		display: flex;
		flex-direction: column;
		justify-content: flex-start
  }
  .tree-form{
    font-family: RobotoBold;
    color: black;

  }
  .tree-form label{
    font-family: RobotoBold;
    color: black;
    font-size: 0.8rem;
    margin-left: 23px;
    margin-top: 25px;

  }
  .button-link {
    color: $color-default-text;
		font-family: RobotoBold;
    font-size: 130%;
    text-decoration: none;
  }
	
</style>