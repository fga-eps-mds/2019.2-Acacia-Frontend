<template>
  <div
    class="digest-content"
    id="digest-content"
    @click="pushToRoute()"
  >
    <div
      id="image-content"
    >
      <v-avatar size="60">
        <img
          :src="image"
          alt=""
        >
      </v-avatar>
    </div>

    <div
      class="harvest-content"
      id="harvest-content"
    >
      <b
        style="font-size:15px"
      > 
        Titulo 
      </b>

      <div
        class="description-content"
        id="description-content"
      >
        <a
          class="description-items"
          style="color:#B3B5BA"
        >
          <b> MAX {{ this.$t('HarvestDigest.volunteer') }}: </b> {{ harvest.max_volunteers }}
        </a>
        <a
          class="description-items"
          style="color:#B3B5BA"
        >
          <b> MIN {{ this.$t('HarvestDigest.volunteer') }}: </b> {{ harvest.min_volunteers }}
        </a>  
      </div>
      <div
        class="description-content"
        id="description-content"
        style="width:75% !important;"
      >
        <a
          class="description-items"
          style="color:#B3B5BA"
        >
          <b> {{ this.$t('HarvestDigest.date') }}: </b> {{ harvest.date }}
        </a>

        <v-icon
          size="13"
          color="#44D102"
          v-if="harvest.status=='Done'"
        >
          mdi-check
        </v-icon>

        <v-icon
          size="13"
          color="#EF476F"
          v-else-if="harvest.status=='Cancelled'"
        >
          mdi-close
        </v-icon>

        <v-icon
          size="13"
          color="#56A3A6"
          v-else-if="harvest.status=='Open'"
        >
          mdi-sprout
        </v-icon>

        <v-icon
          size="13"
          color="#FFE600"
          v-else-if="harvest.status=='Enough'"
        >
          mdi-alert
        </v-icon>

        <a
          class="description-items"
          style="color:red"
          v-else
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

    image: {
      default: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgeographical.co.uk%2Fmedia%2Fk2%2Fitems%2Fcache%2Fbca1dd559f75f65255fb90327f144139_XL.jpg&f=1&nofb=1',
      type: String,
    },
  },

  methods: {
    pushToRoute() {
      let route = 'harvest/' + this.harvest.pk + '/'
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