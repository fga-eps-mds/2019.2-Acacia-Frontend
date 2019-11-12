<template>
  <div
    id="property-view"
    style="background-color:#FDF7F7"
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
      >
        <h2>
          Nome
        </h2>
        
        <div
          class="justify-left subheader-content"
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
      <v-sheet
        height="260"
        style="background-color:#FDF7F7"
      >

        <div
          class="justify-left"
          style="margin-left:30px"
        >
          <a> Funcionando </a>
        </div>

        <v-window>
          <v-window-item
            v-for="n in 3"
            :key="n"
          >
            <v-card
              height="125"
              width="265"
              class="tree-card"
            >
            </v-card>
          </v-window-item>
        </v-window>
      </v-sheet>
    </div>
  </div>
</template>

<script>
  /* Components imports */
  import TopBar from '@/components/layout/TopBar'

  export default {
    components: {
      TopBar,
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

  .top-content{
    height: 190px;
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
    padding-top: 55px;
    padding-left: 40px;
    color: white;
  }

  .subheader-content{
    color: rgba(242, 242, 242, 0.65);
    font-size: 14px;
  }

  .tree-card{
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 12px !important;
    margin-left: 30px;
  }
  
  .justify-left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

</style>