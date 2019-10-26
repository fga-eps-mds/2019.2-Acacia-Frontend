<template>
  <div class="tree-form">
    <TopBar 
      iconleft="chevron-left"
      color="#2D9CDB"
    />

    <div class="content-container">
      <div class="content-title">
        <h3> Cadastrar Arvore </h3>
      </div>

      <div class="content-form">
        <TextField 
          v-model="tree.tree_type" 
          class="mt-3" 
          label="Espécie"
          color="black"
          bordercolor="#C4C4C4" 
        />           
        <TextField 
          v-model="tree.number_of_tree" 
          class="mt-3" 
          label="Número de árvores" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          v-model="tree.height_fruit" 
          class="mt-3" 
          label="Aultura média dos futros" 
          color="black"
          bordercolor="#C4C4C4" 
        />
        <TextField 
          v-model="tree.matury_date" 
          class="mt-3" 
          label="Possivel data de Colheita" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          v-model="haverst_for_year" 
          class="mt-3" 
          label="Colheitas por ano" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <label for="File">Propriedade </label>
          <div class="img-propriedade">
            <input type="file" @change="onFileChanged">
            <!-- <button @click="upload">Upload!</button> -->
          </div>

      <div class="content-button">
        <RegisterButton
          class="mt-4" 
          label="Cadastrar" 
          @action="register"
        />        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import TopBar from '../components/layout/TopBar'
  import TextField from '../components/input/TextField'
  import RegisterButton from '../components/input/RegisterButton'

  export default {
    components: {
      TopBar,
      TextField,
      RegisterButton,
    },

    data() {
      return {
        tree: {},
      }
    },
    methods: {
      onFileChanged (event) {
        const file = event.target.files[0]
      },
      upload() {
      // carregar a foto
       },

      register(){
        if (!this.validateInput()) {
          return
        }       
                
        let state = this.$store.state
        let toasted = this.$toasted

        state.authRequest("tree/", "POST", this.tree)
        .then((response) => {
          toasted.show('Arvore cadastrada com sucesso').goAway(2000)
          this.$router.push({ name: 'home'})
        })
        .catch((error) => {
          if(error.response.data.tree_type){
            this.$toasted.show(error.response.data.tree_type).goAway(2000)
          }
          if(error.response.data.number_of_tree){
            this.$toasted.show(error.response.data.number_of_tree).goAway(2000)
          }
          if(error.response.data.height_fruit){
            this.$toasted.show(error.response.data.height_fruit).goAway(2000)
          }
          if(error.response.data.matury_date){
            this.$toasted.show(error.response.data.matury_date).goAway(2000)
          }
          if(error.response.data.haverst_for_year){
            this.$toasted.show(error.response.data.haverst_for_year).goAway(2000)
          }
        })
        
      },

      validateInput(){
        if (!this.tree_type) {
          this.$toasted.show('Insira a espécie da árvore').goAway(2000)
          return false
        }

        if (!this.number_of_tree) {
          this.$toasted.show('Insira a quantidade de árvores').goAway(2000)
          return false
        }

        if (!this.height_fruit) {
          this.$toasted.show('Insira a altura média dos frutos').goAway(2000)
          return false
        }

        if (!this.matury_date) {
          this.$toasted.show('Insira uma data aproximada de colheita').goAway(2000)
          return false
        }
        
        if (!this.haverst_for_year) {
          this.$toasted.show('Insira a numero de colheitas por ano').goAway(2000)
          return false
        }

        return true
      },
    }
  }

</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";
  
  .tree-form {
    width: 100%;
    height: 100%;
    position: absolute;
    margin-top: 0;
    text-align: center;
    background: white
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .content-title {
    width: 100%;
    padding: 0px 25px;
    margin-bottom: 10%;
    color: #2D9CDB;
    display: flex;
    justify-content: left; 
  }
 .img-propriedade {
      border: 4px;
      width: 360px;
      height: 200px;
      padding: 10px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
 }

   .content-container label{
    font-family: RobotoBold;
    color: black;
    font-size: 0.8rem;
    margin-left: 23px;
    margin-top: 25px;

  }

  .content-button {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

</style>


// <style scoped lang="scss">
// @import "@/assets/stylesheets/colors.scss";

// 	.tree {
//     height: 100%;
//     width: 100%;
// 		display: flex;
// 		justify-content: center;
// 		justify-items: center;
// 	}
//   .tree-container {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       width: 350px;
//       padding: 10px;
//       box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
//   }
//   .tree-container h1{
//     color: $color-primary-text-title;
//     font-size: 1.9rem;
//     padding: 5px 5px;
//     margin-bottom: 40px;
//     margin-right: 40px;
//     margin-top: 70px;
// 	}
//  .img-propriedade {
//       border: 4px;
//       width: 300px;
//       height: 200px;
//       padding: 10px;
//       box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
//   }
// 	.tree-button {
// 		margin: auto;
// 		height: 6%;
// 		width: 80%;
// 		margin-bottom: 40px;
// 		margin-left: 110px;

// 		color: $color-default-text;
// 		font-family: RobotoBold;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: flex-start
//   }
//   .tree-form{
//     font-family: RobotoBold;
//     color: black;

//   }
//  
//   .button-link {
//     color: $color-default-text;
// 		font-family: RobotoBold;
//     font-size: 130%;
//     text-decoration: none;
//   }
	
// </style>