<template>
  <div>
    <TopBar 
      iconleft="chevron-left" 
      class="top-bar"
      iconright="home"
    />
    <div v-if="!getResponseReceived"> 
      <v-progress-circular
        :size="80"
        color="primary"
        style="margin-top: 200px"
        indeterminate
      />
    </div>
    <div 
      v-else-if="!harvestFound" 
      class="container mt-5"
    >
      <h1 
        class="raleway-regular mt-5"
      >
        {{ $t('HarvestView.harvestNotFound') }}
      </h1>
      <SignButton 
        label="Dashboard"
        @action="goToDashboard"
      />
    </div>
    <div
      v-else
      class="harvest-view-body"
    >
      <div class="harvest-header roboto-regular text-white text-left">
        <!-- {{ harvest.description }} -->
        <h4 class="roboto-regular text-white text-left">
          {{ harvest.title ? harvest.title : $t('HarvestView.placeholderTitle') }}
        </h4>
        <div
          style="font-size: 0.8em"
          class="mt-3 mb-3"
        >
          <div class="row mb-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>{{ $t('HarvestView.owner') }}</b>
            </div>
            <div 
              class="col-9 pl-3 p-0"
            >
              Nome do Proprietário
            </div>
          </div>
          <div class="row mt-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>{{ $t('HarvestView.leader') }}</b>
            </div>
            <div 
              class="col-9 pl-3 p-0"
            >
              Nome do líder
            </div>
          </div>
        </div>
        <v-divider 
          color="white"
        />
        <div 
          style="font-size: 0.8em" 
          class="mt-3 mb-3"
        >
          <div class="row mb-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>{{ $t('HarvestView.where') }}</b>
            </div>
            <div 
              class="col-7 pl-3 p-0"
            >
              {{ getAddressString(property) }}
            </div>
            <div 
              class="col-2 pt-0" 
              @click="searchAddress"
            >
              <v-icon 
                color="white"
              >
                mdi-map
              </v-icon>
            </div>
          </div>
          <div class="row mt-0 p-0">
            <div class="col-3 pl-3 p-0">
              <b>{{ $t('HarvestView.when') }}</b>
            </div>
            <div 
              class="col-9 pl-3 p-0"
            >
              {{ harvest.date.replace(/-/g, '/') }}
            </div>
          </div>
        </div>
        <v-divider 
          color="white"
        />
        <div 
          class="row"
          style="font-size: 0.8em"
        >
          <v-progress-circular
            :value="100 * (harvest.min_volunteers / harvest.max_volunteers)"
            size="50"
            width="8"
            rotate="270"
            color="white"
            class="col-3"
          >
            {{ harvest.min_volunteers }}
          </v-progress-circular>
          <div class="col-9 pt-2">
            {{ $t('HarvestView.volunteers') }}: {{ harvest.min_volunteers }} 
            <br>
            {{ $t('HarvestView.minimum') }}: {{ harvest.min_volunteers }} | {{ $t('HarvestView.maximum') }}: {{ harvest.max_volunteers }}
          </div>
        </div>
      </div>

      <div v-if="harvest.rules.length > 0">
        <h5 
          class="harvest-rules-title"
        >
          {{ $t('HarvestView.rules') }}
        </h5>
        <v-card 
          class="mx-auto rules-container" 
          max-width="330"
          tile
        >
          <div 
            v-for="rule in harvest.rules" 
            :key="rule.description" 
            class="row rule-container"
          >
            <div class="col-1 dot-container">
              <div class="dot-icon" />
            </div>
            <div 
              class="col-10 p-0 m-0 text-left rule-text"
            >
              {{ rule.description }}
            </div>
          </div>
        </v-card>
      </div>

      <div class="harvest-info-container">
        <div class="harvest-info-title">
          <h5 
            class="text-white text-left"
          >
            {{ $t('HarvestView.info') }}
          </h5>
        </div>
        <p 
          class="info-text"
        >
          {{ harvest.description }}
        </p>
        <!-- <p class="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/layout/TopBar";
import SignButton from '@/components/input/SignButton'
import router from '@/router'
export default {
  name: "HarvestView",
  components: {
    TopBar,
    SignButton
  },
  data() {
    return {
      harvestFound: false,
      getResponseReceived: false,
      harvest: {},
      property: {},
    };
  },
  created() {
    this.getHarvest();
  },
  methods: {
    goToDashboard() {
      router.push({ name: 'dashboard' })
    },
    getHarvest() {
      this.$store.state
        .authRequest("properties/" + this.$route.params.property_id + "/harvests/" + this.$route.params.harvest_id + '/', "GET")
        .then(response => {
          this.harvestFound = true;
          this.harvest = response.data;
          this.getProperty()
        })
        .catch(() => {
        })
        .finally(() => {
          this.getResponseReceived = true
        })
    },
    getProperty() {
      this.$store.state
        .authRequest("properties/" + this.$route.params.property_id, "GET")
        .then(response => {
          this.property = response.data;
        })
        .catch(() => {});
    },
    getAddressString() {
      return  (this.property.address) + 
              (this.property.complement ? ', ' + this.property.complement : '') + ', ' +
              this.property.city + ' - ' + this.property.state + ', ' +
              this.property.BRZipCode
    },
    searchAddress() {
      let address = this.getAddressString()
      address = address.replace(/ /g, '+').replace(/,/g, '')
      let url = 'https://www.google.com.br/maps/search/' + address + '/'
      let win = window.open(url, '_blank');
      win.focus();
    }
  },
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