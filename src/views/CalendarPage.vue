<template>
  <div class="calendar-page">
    <TopBar
      iconleft="bars"
      iconright="plus"
      class="color-default-text"
    />

    <div :class="'content-container ' + height">
      <vc-calendar
        id="calendar"
        locale="pt-BR"
        :attributes="atributos"
        @dayclick="dayClicked"
      />

      <div id="container-bottom-bar">
        <font-awesome-icon
          :icon="iconBottomBar"
          style="color: white;"
          @click="select()"
        />
      </div>
    </div>
    
    <div 
      :class="hideCards"
    >
      <ul>
        <li 
          v-for="colheita in colheitas" 
          :key="colheita.id"
        >
          <div 
            class="carBody"
            @click="selectCard(colheita.nome)"
          >
            <p class="cardTitle">
              {{ colheita.nome }}
            </p>
            <font-awesome-icon
              v-if="colheita.nome != colheitaCard"
              icon="chevron-right"
              style="color: #376996;"
            /> 
            <font-awesome-icon
              v-if="colheita.nome === colheitaCard"
              icon="chevron-down"
              style="color: #376996;"
            />         
          </div>
          <div 
            v-if="colheita.nome === colheitaCard"
            class="contentCard"
          >
            <p class="cardDescription">
              {{ colheita.descricao }}
            </p>
          </div>     
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'

export default {

  components: {
    TopBar,
  },

  data() {
    return {
      selectedDay: null,
      height: "height-100",
      iconBottomBar: "chevron-up",
      iconCard: "chevron-right",
      colheitaCard: "",

      dates: [
        new Date(2019, 10, 1),
        new Date(2019, 10, 2),
      ],

      dates_info: {
        '2019-11-02': {
          colheitas: [
            {
              descricao: 'Leo lindo é sensacional, imagina com Durvilhoso que é gado',
              nome: 'Babadeira',
            },

            {
              descricao: 'Leolindo345 é sensacional, imagina com Durvilhoso123 que é gado',
              nome: 'Pisadeira',
            },
          ]
        },
        '2019-11-01': {
          colheitas: [
            {
              descricao: 'Leo linxfghjfghsfdhsddo é sensacional, imagina com Durvilhoso que é gado',
              nome: 'Babdfgfdgadeira',
            },

            {
              descricao: 'Leolindo345 é srthfghsfhsfsensacional, imagina com Durvilhoso123 que é gado',
              nome: 'Pisadedfgdfira',
            },
          ]
        }
      },
    }
  },
  
  computed: {
    hideCards: function () {
      return {
        'display-none': this.iconBottomBar === "chevron-up"
      }
    },

    colheitas: function() {
      if(!this.selectedDay){
        return this.allHarvest()
      }
      return this.dates_info[this.selectedDay]['colheitas']
    },

    atributos: function() {
      let attrs = [{
        highlight: {
          color: 'yellow',
          class: 'detail-highlight'
        },

        dates: this.dates,
      }]

      if (this.iconBottomBar == "chevron-up") {
        attrs[0]['highlight'].class = 'highlight'
        return attrs
      }

      return attrs
    },
  },

  methods: {

    select() {

      if (this.iconBottomBar == "chevron-up") {
        this.height = "height-60";
        this.iconBottomBar = "chevron-down";
      }

      else if (this.iconBottomBar == "chevron-down") {
        this.height = "height-100";
        this.iconBottomBar = "chevron-up";
      }
    },
    
    selectCard(colheita) {

      if (this.iconCard == "chevron-right") {
        this.colheitaCard = colheita;
        this.iconCard = "chevron-down";
      }

      else if (this.iconCard == "chevron-down" && this.colheitaCard != "" && this.colheitaCard != colheita) {
        this.colheitaCard = colheita;
        this.iconCard = "chevron-right";
      }

      else {
        this.colheitaCard = "";
        this.iconCard = "chevron-right";
      }
    },

    allHarvest() {
      let harvest = []

      for(var[day, colheitas] of Object.entries(this.dates_info)) {
        for(var[key, colheita] of Object.entries(colheitas)) {
          for(var[desc, info] of Object.entries(colheita)) {
            harvest.push(info)
          }
        }
      }

      return harvest;

    },


    dayClicked(day) {

      if(!(day.id in this.dates_info)) {
        return;
      }

      let colheitas = this.dates_info[day.id]['colheitas'];
      this.selectedDay = day.id;
      
      this.height = "height-60";
      this.iconBottomBar = "chevron-down";
    }
  }
}
</script>

<style lang="scss">
@import "../assets/stylesheets/colors.scss";

  ul{
    color: #376996;
  }

  .detail-highlight {
    margin-bottom: 30%;
    transition-duration: 0.4s;
  }

  .highlight {
    margin-bottom: 120%;
    transition-duration: 0.4s;
  }

  .height-60 {
    height: 60%;
    transition-duration: 0.4s;
  }

  .height-100 {
    height: 100%;
    transition-duration: 0.4s;
  }

  .display-none {
    display: none;
  }

  .cardDescription{
    margin: 0;
    color: $color-primary-text;
    margin-right: 5%;
    text-align: left;
    font-size: 90%;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 15%;
    background-image: linear-gradient(
      45deg,
      rgba(86, 163, 166, 1),
      rgba(75, 125, 170, 85),
      rgba(75, 125, 170, 105)
    );
  }

  .calendar-page{
    width: 100%;
    height: 100%;
    position: absolute;
    margin-top: 0;
    text-align: center;
  }

  .cardTitle{
    margin: 0;
    color: $color-primary-text;
  }

  .carBody {
    padding: 5%;
    display: flex;
    justify-content: space-between;
  }

  #calendar{
    background-color: $transparent;
    border:none ;
    height: 100%;
    width: 100%;
    color: white;
  }

  .vc-relative{
    height: 100%;
  }

  .vc-weekday{
    color: white !important;
  }

  .vc-text-gray-800{
    color: white !important;
  }

  .vc-svg-icon{
    color: white !important;
  }

  #container-bottom-bar {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

</style>