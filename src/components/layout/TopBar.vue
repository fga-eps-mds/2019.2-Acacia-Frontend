<template>
  <div
    id="container-topbar"
    class="navbar fixed-top"
  >
    <font-awesome-icon
      v-if="iconleft"
      v-show="!iconDislay"
      :icon="iconleft"
      :class="color"
      @click="selectLeft"
    />
    <div
      :style="$store.state.getRefreshToken() ? 'display:inline' : 'display:none'"
    >
      <font-awesome-icon
        v-if="iconright"
        :icon="iconright"
        :class="color"
        @click="selectRight"
      />
    </div>
    <ModalCard
      :mensagefield="mensage"
      :buttonlabel="button"
      :valuemodel="changeDialog"
    />
  </div>
</template>

<script>
import ModalCard from '@/components/layout/ModalCard'
import router from '@/router'

export default {

  components: {
    ModalCard
  },

  props: {
    iconleft: {
      default: "",
      type: String,
    },
    iconright: {
      default: '',
      type: String
    },
    color:{
      default: 'color-default-text',
      type: String
    },
  },

  data: () => ({
    button: '',
    mensage: '',
  }),

  computed: {
    iconDislay: function() {
      return this.$store.state.sideBarOn
    },
    changeDialog: {
      get: function() {
        return this.$store.state.modalCardOn
      },
      set: function(value) {
        this.$store.state.modalCardOn = value
      }
    },
  },
  methods: {
    selectLeft() {
      if (this.iconleft == "chevron-left") {
        window.history.length>1 ? this.$router.go(-1) : this.$router.push('/')  
      } else if (this.iconleft == "bars") {
        this.$store.state.sideBarOn = true
      }
    },
    selectRight() {
      if (this.iconright == "pen") {
        // The edit feature will be implemented here
      }
      else if (this.iconright == "home") {
        router.push({ name: 'dashboard' })
      }
      else if (this.iconright == "plus") {
        this.$store.state.authRequest('properties/', 'GET')
        .then(response => {
          if(response.data != 0){
            router.push({ name: 'harvestRegistration' })
          }
          else{
            this.mensage=this.$t('TopBar.mensagePlus')
            this.button=this.$t('TopBar.buttonPlus') 
            this.changeDialog = true
          }
        })
        .catch(error => {
          console.log(error)
        })
      
      }
    },
  }
};
</script>
<style lang="scss" scoped>
    @import '@/assets/stylesheets/colors.scss';
    #container-topbar {
        padding: 15px;
        z-index: 100 !important;
    }
    .color-primary {
        color: $color-primary;
    }
    .color-primary-dark {
        color: $color-primary-dark;
    }
    .color-default-text {
        color: $color-default-text;
    }
</style>
