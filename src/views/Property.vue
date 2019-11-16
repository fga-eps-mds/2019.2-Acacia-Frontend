<template>
  <div
    id="property-view"
    class="property-view"
  >
    <div
      id="top-content"
      class="top-content"
    >
      <TopBar 
        iconleft="bars"
        color="color-default-text"
        style="background-color: rgba(6, 6, 6, 0)"
      />

      <div
        id="username"
        class="justify-left header-content"
      >
        <h2>
          {{ username }}
        </h2>
        
        <div
          id="user-info"
          class="justify-left subheader-content"
        >
          <a> {{ propertyTrees.length }} {{ this.$t('PropertyView.trees') }} </a>
          <a> {{ propertyHarvests.length }} {{ this.$t('PropertyView.harvests') }} </a>
        </div>
      </div>
    </div>

    <div
      id="trees-list"
    >
      <div
        id="slider-sheet"
      >
        <div
          id="trees-title"
          class="justify-left trees-title"
        >
          <h3>
            {{ this.$t('PropertyView.trees') }}
          </h3>
        </div>

        <div
          v-if="propertyTrees.length > 0"
        >
          <v-window
            show-arrows
            dark
          >
            <v-window-item
              v-for="(n, index) in propertyTrees.length"
              :key="n"
              :value="n"
            >
              <TreeCard
                :tree-type="propertyTrees[index].tree_type"
              />
            </v-window-item>
          </v-window>
        </div>
        
        <div
          v-else
        >
          <TreeCard
            :has-tree="false"
          />
        </div>
      </div>    
    </div>

    <div
      id="footer-content"
      class="footer-content"
    >
      <div
        id="footer-title"
        class="justify-left footer-title"
      >
        <a
          style="margin: 12px 0px 0px 24px"
        > 
          {{ this.$t('PropertyView.harvests') }}
        </a>
      </div>
      <v-list
        v-if="propertyHarvests.length>0"
      >
        <v-list-item
          v-for="n in propertyHarvests.length"
          :key="n"
          :value="n"
        >
          <v-list-item-icon>
            <v-icon
              small
              color="#EF476F"
            >
              mdi-checkbox-blank-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>Colheita</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        v-else
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon
              small
              color="#364259"
            >
              mdi-checkbox-blank-circle
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content
            class="raleway-regular"
          >
            {{ this.$t('PropertyView.noharvests') }}
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div
        class="justify-down"
      >
        <div
          class="justify-right"
        >
          <v-btn
            class="bg-color"
            height="45"
            width="30"
            rounded
            style="margin: 0 20px 15px 0"
            href="/harvest/registration"
          >
            <v-icon
              color="white"
              large
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* Components imports */
  import TopBar from '@/components/layout/TopBar'
  import TreeCard from '@/components/layout/TreeCard'

  export default {
    components: {
      TopBar,
      TreeCard,
    },

    data: () => ({
      propertyHarvests: [],
      propertyTrees: [],
      username: '',
    }),

    computed: {
      treeRoute: function() {
        return 'properties/' + this.$route.params.pk.toString() + '/trees'
      },
      harvestRoute: function() {
        return 'properties/' + this.$route.params.pk.toString() + '/harvests'
      }
    },

    mounted() {
      this.getPropertyTrees();
      this.getPropertyHarvests();
      this.getUsername();
    },

    methods: {
      getPropertyTrees(){
        this.$store.state.authRequest(this.treeRoute, 'GET')
        .then(response => {
          this.propertyTrees = response.data
        })
        .catch(error => {
          console.log(error)
        })
      },
      getPropertyHarvests(){
        this.$store.state.authRequest(this.harvestRoute, 'GET')
        .then(response => {
          this.propertyHarvests = response.data
        })
        .catch(error => {
          console.log(error)
        })
      },
      getUsername(){
        this.$store.state.authRequest('users/profile/', 'GET')
        .then(response =>{
          this.username = response.data.username
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/colors.scss";

  .property-view{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FDF7F7;
    display: flex;
    flex-direction: column;
  }

  .top-content{
    height: 350px;
    width: 100%;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
    border-radius: 0px 0px 12px 12px;
  }

  .header-content{
    margin-top: 40px;
    margin-left: 40px;
    color: white;
  }

  .subheader-content{
    color: rgba(242, 242, 242, 0.65);
    font-size: 14px;
    margin-top: 5px;
  }

  .trees-title{
    margin-left: 60px;
    margin-top: 40px;
    color: #56A3A6;
  }

  .footer-title{
    width: 100%;
    height: 300px;
  }

  .footer-content{
    background: white;
    margin-top: 50px;
    height: 100%;
    border-radius: 12px 12px 0px 0px;
  }

  .footer-title{
    height: 50px;
    border-radius: 12px 12px 0px 0px;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
    color: white;
    font-size: 18px;
  }

  .in-center{
    justify-content: center;
    margin-top: 10px;
  }

  .justify-down{
    height: 70%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
  }

  .justify-right{
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
  
  .justify-left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .bg-color{
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
  }

</style>