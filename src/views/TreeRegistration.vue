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
          v-model="treeType" 
          class="mt-3" 
          label="Espécie"
          color="black"
          bordercolor="#C4C4C4" 
        />           
        <TextField 
          v-model="numberTree" 
          class="mt-3" 
          label="Número de árvores" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          v-model="heightFruit" 
          class="mt-3" 
          label="Aultura média dos futros" 
          color="black"
          bordercolor="#C4C4C4" 
        />
        <TextField 
          v-model="maturyDate" 
          class="mt-3" 
          label="Possivel data de Colheita" 
          color="black"
          bordercolor="#C4C4C4"
        />
        <TextField 
          v-model="haverstForYear" 
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
        treeType:'',
        numberTree: '',
        heightFruit: '',
        maturyDate: '',
        haverstForYear: '',
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
          if(error.response.data.treeType){
            this.$toasted.show(error.response.data.treeType).goAway(2000)
          }
          if(error.response.data.numberTree){
            this.$toasted.show(error.response.data.numberTree).goAway(2000)
          }
          if(error.response.data.heightFruit){
            this.$toasted.show(error.response.data.heightFruit).goAway(2000)
          }
          if(error.response.data.maturyDate){
            this.$toasted.show(error.response.data.maturyDate).goAway(2000)
          }
          if(error.response.data.haverstForYear){
            this.$toasted.show(error.response.data.haverstForYear).goAway(2000)
          }
        })
        
      },

      validateInput(){
        if (!this.treeType) {
          this.$toasted.show('Insira a espécie da árvore').goAway(2000)
          return false
        }

        if (!this.numberTree) {
          this.$toasted.show('Insira a quantidade de árvores').goAway(2000)
          return false
        }

        if (!this.heightFruit) {
          this.$toasted.show('Insira a altura média dos frutos').goAway(2000)
          return false
        }

        if (!this.maturyDate) {
          this.$toasted.show('Insira uma data aproximada de colheita').goAway(2000)
          return false
        }
        
        if (!this.haverstForYear) {
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