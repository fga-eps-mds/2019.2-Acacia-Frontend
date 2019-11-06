<template>
  <div class="container-landing">
    <div class="landing-page">    
      <TopBar 
        iconleft="bars"
        color="color-default-text"
        style="background-color: rgba(6, 6, 6, 0)"
      />

      <div class="content-box">
        
        <div class="title-content">
          <h2 class="title-landing">Venha se tornar um Voluntário !</h2>
        </div>

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
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
import BottomBar from '@/components/layout/BottomBar'

export default {
  components: {
    TopBar,
    BottomBar,
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
  }

  .title-landing {
    color: white;
    font-weight: bold;
    text-align: left;
  }

  .title-content{
    margin: 0% 10%;
    padding-bottom: 35%; 
  }

  .content-box {
    padding: 100px 0px;
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
