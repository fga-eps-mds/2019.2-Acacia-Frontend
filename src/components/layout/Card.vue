<template>
  <!-- <div>
    <v-card
      class="mx-auto"
      max-width="320"
      min-height= "210"
      max-height="450"
      style="overflow: auto;"
    >
      <v-col align="center">
        <v-row>
          <v-window
            v-model="localwindow"
            horizontal
          >
            <v-window-item
              v-for="n in lenght"
              :key="n"
              style="overflow: hidden;"
            >
              <p>
                Texto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto textoTexto texto texto texto
              </p>
            </v-window-item>
          </v-window>
        </v-row>
      </v-col>
      <v-card-actions 
        class="justify-content-center"
      >
        <v-item-group
          v-model="localwindow"
          mandatory
          tag="v-flex"
          class="text-center"
        >
          <v-item
            v-for="n in lenght"
            :key="n"
            v-slot:default="{ active, toggle }"
          >
            <v-btn
              :input-value="active"
              icon
              @click="toggle"
              width="15"
              height="15"
            >
              <v-icon
                size="12"
              >
                mdi-record
              </v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </v-card-actions>
    </v-card>
  </div> -->
  <!-- <div>
    <v-card-actions class="justify-space-between">
      <v-item-group 
        class="text-center"
        v-model="window"
        mandatory
      >
          <v-item
            v-for="n in length"
            :key="n"
            v-slot:default="{ active, toggle }"
          >
            <div>
              <v-btn
                :input-value="active"
                icon
                @click="toggle"
              >
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </div>
          </v-item>
      </v-item-group>
      </v-card-actions>
      <v-col>
        <v-window
          v-model="window"
          class="elevation-1"
          vertical
        >
          <v-window-item
            v-for="n in length"
            :key="n"
          >
            <v-card flat>
              <v-card-text>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
  </div> -->
  <div>
    <v-card flat tile>
      <v-window v-model="localwindow">
        <v-window-item
          v-for="n in length"
          :key="`card-${n}`"
        >
          <v-card
            height="400"
            style="overflow:auto"
          >
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
export default {
  name: 'CardComponent',
  props: {
    window: {
      default: 0,
      type: Number,
    },
    lenght: {
      default: 2,
      type: Number
    },
  },
  model: {
    prop: "window", 
    event: "window-change",
  },
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
  data: () => ({
      length: 3,
    }),
}
</script>

<style lang="scss" scoped>

  .card-container {
    padding-bottom: 5%;
  }

</style>