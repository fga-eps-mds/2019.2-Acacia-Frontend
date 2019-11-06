<template>
  <div>
    <v-card
      flat
      tile
    >
      <v-window v-model="localwindow">
        <v-window-item
          v-for="n in length"
          :key="`card-${n}`"
        >
          <v-card
            height="400"
            style="overflow:auto"
          >
            <!-- User's harvests -->
            <div v-if="n == 1">
              <div> 
                <div class="col-2"> 
                  <v-list-item-avatar>
                    <v-img  src="https://secure.gravatar.com/avatar/d39c7a53f244da29da3cd8ccaad6be4c?s=800&d=identicon"></v-img>
                  </v-list-item-avatar>
                </div>
                <div class="col-9 text-left">
                  <h6> <b>Projeto:</b>  Colheita de banana </h6>
                </div>
              </div>
              <div> 
                <div class="col-2"> 
                  <v-list-item-avatar>
                    <v-img  src="https://secure.gravatar.com/avatar/d39c7a53f244da29da3cd8ccaad6be4c?s=800&d=identicon"></v-img>
                  </v-list-item-avatar>
                </div>
                <div class="col-9 text-left">
                  <h6> <b>Projeto:</b>  Colhieta de maça </h6>
                </div>
              </div>
            </div>
            <!-- Week's harvests -->
            <div v-else>
              <div v-for="(harvest, index) in allHarvests" :key="harvest.date">
                <HarvestDigest :harvest="harvest"/>
                <v-divider v-if="index != allHarvests.length - 1"></v-divider>
              </div>
            </div>
          </v-card>
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
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import HarvestDigest from '@/components/visualization/HarvestDigest'
import { all } from 'q';
export default {
  name: 'CardComponent',
  components: {
    HarvestDigest,
  },
  props: {
    window: {
      default: 0,
      type: Number,
    },
  },
  data: () => ({
      length: 3,
    }),
  computed: {
    localwindow: {
      get: function() {
        return this.window;
      },
      set: function(value) {
        this.$emit("window-change", value);
      }
    }
  },
  created() {
    this.getAllHarvests();
  },
  methods: {
    getAllHarvests() {
      this.$store.state.noAuthRequest('harvests/', 'GET')
        .then(response => {
          this.allHarvests = response.data
          this.validateList()
        })
        .catch(error => {
          console.log(error)
        })
    },
    validateList() {
      // Check if date is out of bounds (front end validation)
      let filtered = []
      let dateList = this.generateWeeksDaysList()
      this.allHarvests.forEach( harvest => {
        let found = false;
        dateList.forEach( validDate => {
          if (validDate == harvest.date) {
            found = true;
          }
        });
        if (found) {
          filtered.push(harvest);
        }
      })
      this.allHarvests = filtered;
    },
    generateWeeksDaysList() {
      // Generates a list of the current and the next six days as ISO strings
      let dateList = [];
      let today = new Date();
      let dayInMilissecond = 1000 * 60 * 60 * 24;
      for (let i = 0; i < 6; i++) {
        let dateString = today.toISOString().slice(0,10)
        dateList.push(today.toISOString().slice(0,10))
        today.setTime(dayInMilissecond + today.valueOf());
      }
      return dateList
    }
  },
  data: () => ({
      length: 2,
      allHarvests: [],
    }),
}
</script>

<style lang="scss" scoped>

  .card-container {
    padding-bottom: 5%;
  }

</style>