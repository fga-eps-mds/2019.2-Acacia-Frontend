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
        :from-page.sync="currentPage"
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
        <li 
          v-for="colheita in colheitas" 
          :key="colheita.id"
        >
          <div 
            class="carBody"
            @click="selectCard(colheita.pk)"
          >

            <p class="cardTitle">
              Colheita dia: {{ colheita.date }}
            </p>
            <p class="cardTitle">
              max: {{ colheita.min_volunteers }}
            </p>
            <p class="cardTitle">
              max: {{ colheita.max_volunteers }}
            </p>
            <font-awesome-icon
              v-if="colheita.pk != colheitaCard"
              icon="chevron-right"
              style="color: #376996;"
            /> 
            <font-awesome-icon
              v-if="colheita.pk === colheitaCard"
              icon="chevron-down"
              style="color: #376996;"
            />         
          </div>
          <div 
            v-if="colheita.pk === colheitaCard"
            class="contentCard"
          >
            <div
              class="contentCardText" 
            >
              <p class="cardDescription">
                <b>Descrição:</b> {{ colheita.description }}
              </p>
              <p 
                class="cardDescription"
              >
                <b>Regras:</b>
              </p>
              <p 
                class="cardDescription"
                v-for="rule in colheita.rules"
                :key="rule.id"
              >
                - {{ rule.description }}
              </p>
            </div>
            <SignButton
              buttonstyle="color: #ffffff" 
              color="bg-color-primary"
              label="Ver mais informações" 
              class="content-button" 
              @action="moreInformation(colheita)"
            />
          </div>     
        </li>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'
import SignButton from '@/components/input/SignButton'
import router from '@/router'

export default {

  components: {
    TopBar,
    SignButton
  },


  data() {
    return {
      currentPage: null,
      selectedDay: null,
      height: "height-100",
      iconBottomBar: "chevron-up",
      iconCard: "chevron-right",
      colheitaCard: "",
      harvest: [],
      dates: [],
      datesInfo: [],
      datesSelect: {},
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
        return this.harvest
      }
      
      return this.datesInfo
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

  watch: {
    currentPage: function (val) {
      let state = this.$store.state

      const route = 'monthly_harvest/' + val.year + '/' + val.month

      state.authRequest(route, 'GET')
        .then((response) => {
          console.log(response)
          this.harvest = response.data
          for(var[day_harvest, harvest] of Object.entries(this.harvest)) {
            this.dates.push(harvest.date)
            this.datesSelect[harvest.date] = harvest
          }
        })
        .catch((errors) => {
          console.log(errors.response)
        })

    }
  },

  methods: {

    moreInformation(val){
      router.push({ path: '/harvest/' + val.property_id + '/' + val.pk })
    },

    activeShadow (val) {
      if(val === this.colheitaCard){
        return true
      }
      return false
    },

    select() {
      if (this.iconBottomBar == "chevron-up") {
        this.selectedDay = null;
        this.colheitaCard = "";
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


    dayClicked(day) {

      this.datesInfo = []

      if(!(day.id in this.datesSelect)) {
        return;
      }

      for(var[day_harvest, harvest] of Object.entries(this.harvest)) {
        if(harvest.date === day.id) this.datesInfo.push(harvest)
      }

      this.selectedDay = day.id;
      
      this.height = "height-60";
      this.iconBottomBar = "chevron-down";
    }
  }
}
</script>

<style lang="scss">
@import "../assets/stylesheets/colors.scss";

  .detail-highlight {
    margin-bottom: 30%;
    transition-duration: 0.4s;
  }

  .contentCard {
    padding: 3% 5%;
    background: #f0f0f0;
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
    margin: 0px !important;
    color: $color-primary-text;
    text-align: left;
    font-size: 90%;
    font-size: 70%;
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
    font-size: 80%;
    color: $color-primary-text;
  }

  .carBody {
    padding: 5% 5% 0% 5%;
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

  .content-button {
    font-size: 70%;
    padding: 0px !important;
  }

  .contentCardText {
    padding: 12px 0px;
  }

</style>