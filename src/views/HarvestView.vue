<template>
  <div>
    <TopBar iconleft="chevron-left"/>
    <div v-if="!harvestFound">
      <h1 class="raleway-regular mt-5"> Harvest was not found </h1>
    </div>
    <div v-else>
      <div class="harvest-header">
        <!-- {{ harvest.description }} -->
        <h4 class="roboto-regular text-white text-left"> Colheita de Jaca </h4>
      </div>

      <div class="">
        <h4 class="harvest-rules-title">
          Regras e Avisos
        </h4>
        <v-card
          class="mx-auto rules-container"
          max-width="330"
          tile
        >
          <div 
            v-for="rule in rules" 
            :key="rule"
            class="row rule-container">
          <div class="col-1 dot-container">
            <div class="dot-icon"/>
          </div>
          <div class="col-10 p-0 m-0 text-left rule-text">
            {{ rule }}
          </div>
          </div>
        </v-card>
      </div>
      
      <div class="harvest-info-container">

        <div class="harvest-info-title">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
export default {
  name: 'HarvestView',
  created() {
    this.getHarvest();
  },
  components: {
    TopBar,
  },
  methods: {
    getHarvest() {
      this.$store.state.noAuthRequest('harvests/' + this.id + '/', 'GET')
        .then(response => {
          this.harvestFound = true
          this.harvest = response.data
        })
        .catch(() => {
        })
    },
  },
  data() {
    return {
      harvestFound: false,
      harvest: {},
      rules: [
        "Drinking alcohol is not ok",
        "Don't bring any weapons or knifes",
        "Discrimation is not allowed at all",
        "You may bring friends",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ]
    }
  },
  props: {
    id: {
      type: String,
      default: "-1",
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

  .harvest-header {
    background-color: $color-secundary;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 0px 3px 7px #aaaaaa;
    height: 300px;
    padding: 20px;
    padding-top: 45px;
  }
  .harvest-rules {
  }
  .harvest-rules-title {
    text-align: left;
    color: $color-primary-text-title;
    padding: 20px 0px 0px 30px;
    font-size: 2em;
  }
  .rules-container {
    border-radius: 10px;
  }
  .dot-icon {
    border-radius: 50%;
    background-color: $color-primary;
    height: 8px;
    width: 8px;
  }
  .dot-container { 
    height: 20px;
    padding-top: 6px;
  }
  .rule-text {
    font-size: 0.9em;
  }
  .rule-container {
    padding: 4px 10px 4px 10px;
  }
  .harvest-info-title {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: $color-secundary;
    height: 50px;
    width: 100%; 
  }
  .harvest-info-container {
    margin-top: 20px;
    border-radius: 30px;
    width: 100%;
    height: 100px;
  }
</style>