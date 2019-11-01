<template>
  <div>

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
  </div>

</template>
<script>
export default {
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
  }
}
</script>

<style lang="scss" scoped>

  .card-container {
    padding-bottom: 5%;
  }

</style>