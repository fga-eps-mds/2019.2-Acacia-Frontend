<template>
  <div
    id="digest-content"
    class="digest-content"
    @click="pushToRoute()"
  >
    <div
      id="image-content"
    >
      <v-avatar 
        size="60"
        color="#56A3A6"
      >
        <img
          src="@/assets/images/logo.svg"
          alt=""
        >
      </v-avatar>
    </div>

    <div
      id="harvest-content"
      class="harvest-content"
    >
      <b
        style="font-size:15px"
      > 
        {{ $t('HarvestDigest.harvest') }}
      </b>

      <div
        id="description-content"
        class="description-content"
      >
        <a
          class="description-items"
          style="color:#949090"
        >
          <b> MAX {{ this.$t('HarvestDigest.volunteer') }}: </b> {{ harvest.max_volunteers }}
        </a>
        <a
          class="description-items"
          style="color:#949090"
        >
          <b> MIN {{ this.$t('HarvestDigest.volunteer') }}: </b> {{ harvest.min_volunteers }}
        </a>  
      </div>
      <div
        id="description-content"
        class="description-content"
        style="width:75% !important;"
      >
        <a
          class="description-items"
          style="color:#949090"
        >
          <b> {{ this.$t('HarvestDigest.date') }}: </b> {{ harvest.date }}
        </a>

        <v-icon
          v-if="harvest.status=='Done'"
          size="13"
          color="#44D102"
        >
          mdi-check
        </v-icon>

        <v-icon
          v-else-if="harvest.status=='Cancelled'"
          size="13"
          color="#EF476F"
        >
          mdi-close
        </v-icon>

        <v-icon
          v-else-if="harvest.status=='Open'"
          size="13"
          color="#56A3A6"
        >
          mdi-sprout
        </v-icon>

        <v-icon
          v-else-if="harvest.status=='Enough'"
          size="13"
          color="#FFE600"
        >
          mdi-alert
        </v-icon>

        <a
          v-else
          class="description-items"
          style="color:red"
        >
          Lula Livre
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HarvestDigest",
  props: {
    harvest: {
      default: function() {
        return {}
      },
      type: Object
    },
  },

  methods: {
    pushToRoute() {
      let route = '/harvest/' + this.harvest.property_id + '/' + this.harvest.pk + '/'
      this.$router.push(route)
      return
    }
  }
}
</script>

<style>
  .digest-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start; 
    cursor: pointer;
    margin-right: 0px;
    width: 100%;
  }

  .harvest-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    margin-left: 15px;
    width: 70%;
  }

  .description-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .description-items {
    font-size: 10px;
  }
</style>