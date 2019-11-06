<template>
  <div class="container-landing">
    <TopBar 
      iconleft="bars"
      color="color-default-text"
      style="background-color: rgba(6, 6, 6, 0)"
    />
    <div class="landing-page">    

      <div class="title-content">
        <h2 class="title-landing">Venha se tornar um Voluntário !</h2>
      </div>

      <div class="content-box">
        

        <div
          class="image-content" 
        >
          <img 
            width="60%" 
            class="image-cell" 
            src="../assets/images/cellFront.svg"
          >
          <img 
            width="60%" 
            class="image-cell-background"
            src="../assets/images/cellShadow.svg"
          >
        </div>
      </div>
      <div class="container-button">
        <SignButton
          label="Entrar" 
          class="content-button"
          buttonStyle="color: #376996" 
          @action="login"
          color="bg-color-default"
        />
        <SignButton
          label="Cadastrar" 
          class="content-button" 
          buttonStyle="color: #376996" 
          @action="cadastro"
          color="bg-color-default"
        />
      </div>
    </div>
    <div class="content-acacia">
      <p class="left-paragraph">
        Acácia propõe-se a facilitar a criação de uma comunidade voluntária em torno da agricultura urbana,
        diminuindo o desperdício de comida e difundindo conhecimento em plantio e colheita neste ambiente.
        Crie já sua conta e participe desta mudança!
      </p>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
import BottomBar from '@/components/layout/BottomBar'
import SignButton from '@/components/input/SignButton'
import router from '@/router'

export default {
  components: {
    TopBar,
    BottomBar,
    SignButton,
  },
  methods: {
    login() {
      router.push({ name: 'signin' })      
    },
    cadastro() {
      router.push({ name: 'signup' })      
    },
  },
}

</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

  .landing-page {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .container-button {
    padding-top: 25%;
  }

  .content-acacia {
    margin: 0% 10%;

  }

  .left-paragraph{
    font-size: 80%;
    text-align: left;
  }

  .content-button {
    padding: 0px;
  }

  .title-landing {
    color: white;
    font-weight: bold;
    text-align: left;
  }

  .title-content{
    margin: 0% 10%;
  }

  .image-content {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .image-cell-background {
    position: absolute;
    z-index: 1;

    animation-duration: 2s;
    animation-name: upCell;

    margin: 5%  0 0 0;
  }

  @keyframes upCell {
    from {
      margin: 0%  0 0 0;
    }

    to {
      margin: 3%  0 0 0;
    }

    to {
      margin: 5%  0 0 0;
    }
  }

  .image-cell {
    position: absolute;
    z-index: 2;
  
    animation-duration: 2s;
    animation-name: downCell;

    margin: -5%  0 0 0;
  }

  @keyframes downCell {
    from {
      margin: 0% 0 0 0;
    }

    to {
      margin: -3% 0 0 0;
    }

    to {
      margin: -5% 0 0 0;
    }
  }


</style>
