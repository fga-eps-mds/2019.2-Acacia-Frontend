<template>
  <v-dialog
    v-model="changeModel"
    width="500"
  >
    <v-card
      class="content-card"
    >
      <v-card-text 
        class="text-card"
      >
        Cadastre uma propriedade para cadastrar uma colheita. 
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <SignButton
          buttonstyle="color: white"
          color="bg-color-primary"
          label="Cadastrar"
          class="content-button"
          @action="cadastrar"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SignButton from '@/components/input/SignButton'
import router from '@/router'

export default {
  components: {
    SignButton,
  },
  computed:{
    changeModel: {
      get: function() {
        return this.$store.state.modalCardOn
      },
      set: function(value) {
        this.$store.state.modalCardOn = value
      }
    }
  },
  methods: {
    cadastrar() {
      this.changeModel = false
      router.push({ name: 'propertyRegistration' })   
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/stylesheets/colors.scss";

  .content-card {
    border-radius: 12px !important;
  }

  .text-card {
    font-size: 120%;
    padding: 20px 20px 15px 20px !important;
    color: $color-primary !important;
  }

  .content-button {
    padding: 0px;
  }

</style>