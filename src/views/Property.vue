<template>
  <div
    id="property-view"
    class="property-view"
  >
    <div
      class="top-content"
      id="top-content"
    >
      <TopBar 
        iconleft="bars"
        color="color-default-text"
        style="background-color: rgba(6, 6, 6, 0)"
      />

      <div
        class="justify-left header-content"
        id="username"
      >
        <h2>
          Nome
        </h2>
        
        <div
          class="justify-left subheader-content"
          id="user-info"
        >
        <a> Árvores </a>
        <a> Propriedades </a>
        <a> Colheitas </a>
        </div>
      </div>
    </div>

    <div
      id="trees-list"
    >

      <div
        class="slider-sheet"
        id="slider-sheet"
      >
        <div
          class="justify-left trees-title"
          id="trees-title"
        >
          <h3> Árvores </h3>
        </div>
      
        <v-window
          style="margin-top:10px"
        >
          <v-window-item
            v-for="n in 3"
            :key="n"
            :value="n"
          >
            <TreeCard/>
          </v-window-item>
        </v-window>
      </div>
    </div>

    <div
      id="footer-content"
      class="footer-content"
    >
      <div
        id="footer-title"
        class="justify-left footer-title"
      >
        
        <a
          class="title-style"
        > 
          Colheitas 
        </a>
      </div>

      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon
              color="red"
            >
              mdi-checkbox-blank-circle
            </v-icon>
          </v-list-item-icon>

          <v-list-item-title>Colheita babadeira</v-list-item-title>
        </v-list-item>
      </v-list>
    
    </div>
  </div>
</template>

<script>
  /* Components imports */
  import TopBar from '@/components/layout/TopBar'
  import TreeCard from '@/components/layout/TreeCard'
  import WeeklyCard from '../components/layout/WeeklyCard'

  export default {
    components: {
      TopBar,
      TreeCard,
      WeeklyCard,
    },

    data() {
      return{
        numOfTrees,
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/colors.scss";

  .property-view{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FDF7F7;
    display: flex;
    flex-direction: column;
  }

  .top-content{
    height: 350px;
    width: 100%;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
    border-radius: 0px 0px 12px 12px;
  }

  .header-content{
    margin-top: 40px;
    margin-left: 40px;
    color: white;
  }

  .subheader-content{
    color: rgba(242, 242, 242, 0.65);
    font-size: 14px;
  }

  .trees-title{
    margin-left:30px;
    margin-top: 40px;
    color: #56A3A6;
  }
  
  .justify-left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-title{
    width: 100%;
    height: 300px;
  }

  .footer-content{
    background: white;
    margin-top: 50px;
    height: 100%;
    border-radius: 12px 12px 0px 0px;
  }

  .footer-title{
    height: 50px;
    border-radius: 12px 12px 0px 0px;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
    color: white;
    font-size: 18px;
  }

  .title-style{
    margin: 12px 0px 0px 24px;
  }

</style>