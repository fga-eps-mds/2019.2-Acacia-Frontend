<template>
  <div
    id="container-bottombar"
    :class="backgroundColor + ' static-bottom'"
  >

    <div class="container-icon">
      <v-list-item
        v-for="item in bottomIcon"
        :key="item.title"
        link
      > 
        <a
          :href="item.link"
        >
          <font-awesome-icon
            :icon="item.icon"
            :class="colorIcon + ' content-icon'"
          />
        </a>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      bottomIcon: [
        { 
          title: 'github',
          icon: [ 'fab', 'github' ],
          link: 'https://github.com/fga-eps-mds/2019.2-Acacia/'
        },
      ],
    }
  },

  props: {
    backgroundColor: {
        default: "bg-transparent",
        type: String
    },
    colorIcon: {
        default: "text-color-primary-title",
        type: String
    }
  }
  
};
</script>

<style lang="scss" scoped>
    @import '@/assets/stylesheets/colors.scss';

    #container-bottombar {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      z-index: 100 !important;
    }

    .container-icon {
        margin-right: 5%;
    }

    .content-icon {
      font-size: 1.75em;
    }
    
</style>
