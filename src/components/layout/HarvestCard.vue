<template>
  <v-card
    flat
    tile
    min-height="250"
    max-height="450"
    class="card-container"
  >
    <v-window 
      v-model="localwindow"
    >
      <v-window-item
        v-for="n in length"
        :key="`card-${n}`"
      >
        <v-sheet
          min-height="200"
          max-height="300"
          style="overflow:auto"
        >
          <!-- User's harvests -->
          <div v-if="n == 1">
            <h3 class="title-content roboto-regular"> 
              {{ $t('HarvestDigest.userProperties') }} 
            </h3>
            <div v-if="$store.state.getRefreshToken()">
              <div v-if="!propertiesGet">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                  class="mt-5"
                ></v-progress-circular>
              </div>
              <div v-else-if="userProperties.length == 0">
                <div
                  class="centralize-container"
                >
                  <h4
                    style="width:90%"
                    class="message-content raleway-regular"
                  > 
                    {{ $t('HarvestDigest.noProperties') }} 
                  </h4> 
                </div>
              </div>
              <div v-else> 
                <div
                  v-for="(property, index) in userProperties"
                  :key="property.address"
                >
                  <a :href="'/property/' + property.pk + '/'">
                    <PropertyDigest :property="property" />
                  </a>
                  <v-divider v-if="index != userProperties.length - 1" />
                </div>
              </div>
            </div>
            <div
              v-else
              class="message-content raleway-regular"
            >
              <div
                class="centralize-container"
              >
                <h4 
                  style="width: 90%"
                > 
                  {{ signinMessage }} 
                </h4>
              </div>
            </div>
          </div>

          <!-- Week's harvests -->
          <div v-else>
            <h3 class="title-content roboto-regular"> 
              {{ weekHarvests }}
            </h3>
            <div v-if="!harvestGet">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                class="mt-5"
              ></v-progress-circular>
            </div>
            <div
              v-else-if="allHarvests.length == 0"
              class="message-content raleway-regular"
            >
              <div
                class="centralize-container"
              >
                <h4
                  style="width:90%"
                > 
                  {{ noHarvest }} 
                </h4> 
              </div>
            </div>

            <div
              v-else
            >
              <div
                v-for="(harvest, index) in allHarvests"
                :key="harvest.date"
              >
                <a :href="'/harvest/' + harvest.property_id + '/' + harvest.pk">
                  <HarvestDigest :harvest="harvest" />
                </a>
                <v-divider v-if="index != allHarvests.length - 1" />
              </div>
            </div>
          </div>
        </v-sheet>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-content-center">
      <v-item-group
        v-model="localwindow"
        class="text-center"
      >
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon
              size="15"
            >
              mdi-record
            </v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>

<script>
import HarvestDigest from '@/components/visualization/HarvestDigest'
import PropertyDigest from '@/components/visualization/PropertyDigest'

export default {
  name: 'CardComponent',
  
  components: {
    HarvestDigest,
    PropertyDigest
  },

  model: {
    prop: "window",
    event: "window-change",
  },

  props: {
    window: {
      default: 0,
      type: Number,
    },
  },
  
  data: () => ({
    length: 2,
    allHarvests: [],
    userProperties: [],
    propertiesGet: false,
    harvestGet: false
  }),

  computed: {
    localwindow: {
      get: function() {
        return this.window;
      },
      set: function(value) {
        this.$emit("window-change", value);
      },
    },
    subHarvests: function() {
      return this.$t('HarvestDigest.subscribed')
    },
    weekHarvests: function() {
      return this.$t('HarvestDigest.weekharvests')
    },
    signinMessage: function() {
      return this.$t('HarvestDigest.message')
    },
    noHarvest: function() {
      return this.$t('HarvestDigest.noharvest')
    },
  },

  created() {
    this.getUserProperties();
    this.getAllHarvests();
  },

  methods: {
    getAllHarvests() {
      this.$store.state.noAuthRequest('harvests/', 'GET')
        .then(response => {
          this.allHarvests = 
            Object
              .keys(response.data)
              .map(i => response.data[i])
          this.allHarvests.sort(
            (a, b) => {
              a = new Date(a.date)
              b = new Date(b.date)
              return  a.getTime() - b.getTime()
            }
          )
        })
        .catch(() => {
          this.$store.commit('snackbar/showMessage', {
            message: 'An error has ocurred searching for harvests',
            color: 'error',
            })
        })
        .finally(() => {
          this.harvestGet = true
        })
    },
    getUserProperties() {
      this.$store.state.authRequest('properties/', 'GET')
        .then((response) => {
          this.userProperties = 
            Object
              .keys(response.data)
              .map(i => response.data[i])
        })
        .catch((error) => {
          this.$store.commit('snackbar/showMessage', {
            message: 'An error has ocurred searching for your properties',
            color: 'error',
            })
        })
        .finally(() => {
          this.propertiesGet = true
        })
    },
  },
}
</script>

<style lang="scss" scoped>

  .card-container {
    padding-bottom: 15px;
    overflow: auto;
    border-radius: 12px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  }

  .title-content {
    text-align: left;
    color: #2D9CDB;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .v-btn--icon.v-size--default {
    height: 20px;
    width: 20px;
  }

  .message-content {
    text-align: justify;
    margin-top: 25px;
  }

  .centralize-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>