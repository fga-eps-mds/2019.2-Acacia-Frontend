<template>
  <div class="container-landing">
    <TopBar 
      iconleft="bars"
      color="color-default-text"
      style="background-color: rgba(6, 6, 6, 0)"
    />
    <div class="landing-page">    
      <div class="title-content">
        <h2 
          class="title-landing"
        >
          Venha se tornar um Voluntário !
        </h2>
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
          :style="$store.state.getRefreshToken() ? 'display:none' : 'display:inline'"
          buttonstyle="color: #376996" 
          color="bg-color-default"
          label="Entrar" 
          class="content-button"
          @action="login"
        />
        <SignButton
          :style="$store.state.getRefreshToken() ? 'display:none' : 'display:inline'"
          buttonstyle="color: #376996" 
          color="bg-color-default"
          label="Cadastrar" 
          class="content-button" 
          @action="cadastro"
        />
        <SignButton
          :style="$store.state.getRefreshToken() ? 'display:inline' : 'display:none'"
          buttonstyle="color: #376996" 
          color="bg-color-default"
          label="Participar" 
          class="content-button" 
          @action="dashboard"
        />
      </div>
    </div>
    
    <div class="content-acacia">
      <p class="left-paragraph">
        Acácia propõe-se a facilitar a criação de uma comunidade voluntária em torno da agricultura urbana,
        diminuindo o desperdício de comida e difundindo conhecimento em plantio e colheita neste ambiente.
      </p>
      <img 
        width="30%" 
        src="../assets/images/logo.svg"
      >
    </div>
    <div class="content-colheita">
      <h6 
        style="font-weigth: bold"
      >
        Crie já sua conta e participe desta mudança!
      </h6>
    </div>
    <BottomBar />
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
import BottomBar from '@/components/layout/BottomBar'
import SignButton from '@/components/input/SignButton'
import router from '@/router'
console.log("VUE_APP_MODE = "+process.env.VUE_APP_MODE)
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
    dashboard() {
      router.push({ name: 'dashboard' })
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

  .content-colheita{
    margin: 0% 0% 10% 0%;
  }

  .container-button {
    font-size: 150%;
    padding-top: 25%;
  }

  .content-acacia {
    display: flex;
    justify-content:space-between;
    margin: 10% 8%;
  }

  .left-paragraph{
    font-size: 80%;
    text-align: justify;
    width: 60%;
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
