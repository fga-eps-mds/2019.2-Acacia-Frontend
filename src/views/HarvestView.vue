<template>
  <div>
    <TopBar iconleft="chevron-left" class="top-bar"/>
    <div v-if="!harvestFound">
      <h1 class="raleway-regular mt-5">Harvest was not found</h1>
    </div>
    <div v-else class="harvest-view-body">
      <div class="harvest-header roboto-regular text-white text-left">
        <!-- {{ harvest.description }} -->
        <h4 class="roboto-regular text-white text-left">Colheita de Jaca</h4>
        <div style="font-size: 0.8em" class="mt-3 mb-3">
          <div class="row mb-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>Proprietário</b>
            </div>
            <div class="col-9 pl-3 p-0">Nome do Proprietário</div>
          </div>
          <div class="row mt-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>Líder</b>
            </div>
            <div class="col-9 pl-3 p-0">Nome do líder</div>
          </div>
        </div>
        <v-divider color="white"></v-divider>
        <div style="font-size: 0.8em" class="mt-3 mb-3">
          <div class="row mb-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>Onde</b>
            </div>
            <div class="col-7 pl-3 p-0">QE 32 Conjunto K casa 33, Guará 2 Brasília DF</div>
            <div class="col-2 pt-0">
              <v-icon color="white">mdi-map</v-icon>
            </div>
          </div>
          <div class="row mt-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>Quando</b>
            </div>
            <div class="col-9 pl-3 p-0">{{ harvest.date.replace(/-/g, '/') }}</div>
          </div>
        </div>
        <v-divider color="white"></v-divider>
        <div class="row" style="font-size: 0.8em">
          <v-progress-circular
            :value="100 * (harvest.min_volunteers / harvest.max_volunteers)"
            size="50"
            width="8"
            rotate="270"
            color="white"
            class="col-3"
          >{{ harvest.min_volunteers }}</v-progress-circular>
          <div class="col-9 pt-2">
            Volunteers: {{ harvest.min_volunteers }}
            <br />
            Minimum: {{ harvest.min_volunteers }} | Maximum: {{ harvest.max_volunteers }}
          </div>
        </div>
      </div>

      <div class>
        <h5 class="harvest-rules-title">Regras e Avisos</h5>
        <v-card class="mx-auto rules-container" max-width="330" tile>
          <div v-for="rule in rules" :key="rule" class="row rule-container">
            <div class="col-1 dot-container">
              <div class="dot-icon" />
            </div>
            <div class="col-10 p-0 m-0 text-left rule-text">{{ rule }}</div>
          </div>
        </v-card>
      </div>

      <div class="harvest-info-container">
        <div class="harvest-info-title">
          <h5 class="text-white text-left">Informações da colheita</h5>
        </div>
        <!-- <p>{{ harvest.description }}</p> -->
        <p class="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/layout/TopBar";
export default {
  name: "HarvestView",
  created() {
    this.getHarvest();
  },
  components: {
    TopBar
  },
  methods: {
    getHarvest() {
      this.$store.state
        .noAuthRequest("harvests/" + this.id + "/", "GET")
        .then(response => {
          this.harvestFound = true;
          this.harvest = response.data;
          console.log(this.harvest);
        })
        .catch(() => {});
    }
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
    };
  },
  props: {
    id: {
      type: String,
      default: "-1"
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

.harvest-header {
  background-color: $color-secundary;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0px 3px 7px #bbbbbb;
  padding: 20px;
  padding-top: 50px;
}
.harvest-rules-title {
  text-align: left;
  color: $color-secundary-text-title;
  padding: 20px 0px 0px 30px;
  font-size: 1.5em;
}
.rules-container {
  border-radius: 10px;
  padding: 5px;
}
.dot-icon {
  border-radius: 50%;
  background-color: $color-secundary;
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
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: $color-secundary;
  height: 45px;
  width: 100%;
  padding-left: 23px;
  padding-top: 11px;
}
.harvest-info-container {
  margin-top: 20px;
  border-radius: 30px;
  width: 100%;
  height: 100px;
  margin-bottom: 100px;
}
.harvest-view-body {
  background-color: $color-ice-background;
}
.info-text {
  padding: 10px;
}
.top-bar {
  background-color: $color-secundary;
}
</style>