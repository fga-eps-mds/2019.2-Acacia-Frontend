<template>
  <div>
    <div class="p-3 mt-5">
      
      <h1 class="raleway-regular mb-5">Dashboard</h1>
      <v-window v-model="step" class="p-3">
        <v-window-item :value="1" class="diva">
          <v-card-text>
            <h3>SEGUNDA</h3>
            <p>Colheita E</p>
            <p>Colheita B</p>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2" class="diva">
          <v-card-text>
            TERÇA
            <p>Colheita D</p>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3" class="diva">
          <v-card-text>
            QUARTA
            <p>Colheita C</p>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4" class="diva">
          <v-card-text>
            QUINTA
          </v-card-text>
        </v-window-item>

        <v-window-item :value="5" class="diva">
          <v-card-text>
            SEXTA
            <p>Colheita A</p>
            <p>Colheita F</p>
          </v-card-text>
        </v-window-item>
      </v-window>

    </div>
    <div class="p-3">

      <v-col align="center">
        <v-row>
          <v-window
            v-model="window"
            horizontal
          >
            <v-window-item
              v-for="n in length"
              :key="n"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </v-window-item>
          </v-window>
        </v-row>
        <v-card-actions class="justify-content-center" >
          <v-item-group
            v-model="window"
            mandatory
            tag="v-flex"
            class="text-center"
          >
            <v-item
              v-for="n in length"
              :key="n"
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
      </v-col>

    </div>
  </div>
</template>

<script>
/* Component imports */
import router from '@/router'
export default {
  name: 'Home',
  components: {
    },
  data: () => ({
      step: 1,
      length: 3,
      window: 0,
    }),
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "../assets/stylesheets/colors.scss";

.diva {
  margin: 10px;
  background-color: $color-secundary;
  color: white;
  border-radius: 10px !important;
}

</style>
