<template>
  <div v-if="!harvestFound">
    <h1 class="raleway-regular mt-5"> Harvest was not found </h1>
  </div>
  <div v-else>
    <h1 class="raleway-regular"> {{ harvest.description }} </h1>
  </div>
</template>

<script>
export default {
  name: 'HarvestView',
  created() {
    this.getHarvest();
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

<style>

</style>