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
        :available-dates="{ start: new Date(), end: null }"
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
      v-if="colheitas.length > 0"
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
          <div
            id="harvestTitle"
            class="harvestTitle"
          >
            <v-icon
              v-if="colheita.status === 'Open'"
              style="margin-bottom:20px"
              size="16"
              color="#ffd131"
            >
              mdi-checkbox-blank-circle
            </v-icon>
            <v-icon
              v-else
              style="margin-bottom:20px"
              size="16"
              color="#ef476f"
            >
              mdi-checkbox-blank-circle
            </v-icon>
            <p 
              class="cardTitle"
              style="margin-left:15px"
            >
              <b>
                {{ $t('Calendar.harvest') }}
              </b>
            </p>
          </div>

          <p class="cardTitle">
            ({{ colheita.date }})
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
            <div
              id="volunteerContent"
            >
              <p class="cardDescription raleway-bold">
                <b> 
                  {{ $t('Calendar.volunteers') }}
                </b>
              </p>
              <div
                class="descriptionItem minMaxContent"
              >
                <p class="cardDescription">
                  {{ $t('Calendar.minimum') }} {{ colheita.min_volunteers }}
                </p>
                <p class="cardDescription">
                  {{ $t('Calendar.maximum') }} {{ colheita.max_volunteers }}
                </p>
              </div>
            </div>

            <div
              id="descriptionContent"
              style="margin-top:15px"
            >
              <p class="cardDescription raleway-bold">
                <b>
                  {{ $t('Calendar.description') }}
                </b>
              </p>
              <div
                class="descriptionItem"
              >
                <p class="cardDescription">
                  {{ colheita.description }}
                </p>
              </div>
            </div>
              
            <div
              id="rulesContent"
              style="margin-top:15px"
            >
              <p class="cardDescription raleway-bold">
                <b>
                  {{ $t('Calendar.rules') }}
                </b>
              </p>
              <div
                class="descriptionItem"
              >
                <p 
                  v-for="rule in colheita.rules"
                  :key="rule.id"
                  class="cardDescription"
                >
                  - {{ rule.description }}
                </p>
              </div>
            </div>
          </div>

          <SignButton
            v-if="colheita.status === 'Open'"
            buttonstyle="color: #ffffff" 
            color="bg-color-primary"
            :label="$t('Calendar.about')" 
            class="content-button" 
            @action="moreInformation(colheita)"
          />
        </div>     
      </li>
    </div>

    <div
      v-else
      :class="hideCards"
    >
      <div
        class="centralize-content" 
      >
        <div
          class="centralize-message"
        >
          <h3
            class="raleway-regular"
          > 
            {{ $t('Calendar.hoharvest') }}
          </h3>
        </div>
      </div>
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
      beforeToday: [],
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
        dates: this.dates,
        
        highlight: {
          class: 'highlight',
        },
      },
      {
        dates: this.beforeToday,
        
        highlight: {
          class: 'before-highlight',
        },
      }]

      return attrs

    },
  },

  watch: {
    currentPage: function (val) {
      let state = this.$store.state

      const route = 'monthly_harvest/' + val.year + '/' + val.month

      state.authRequest(route, 'GET')
        .then((response) => {
          this.harvest = response.data
          for(var[day_harvest, harvest] of Object.entries(this.harvest)) {
            if(harvest.status === 'Open'){
              this.dates.push(harvest.date)
            }
            else{
              this.beforeToday.push(harvest.date)
            }
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

  .contentCard {
    padding: 3% 5%;
    background: #f0f0f0;
  }

  .highlight {
    background-color: #ffd131 !important;
    margin-bottom: auto;
    transition-duration: 0.4s;
  }

  .before-highlight {
    background-color: #ef476f !important;
    margin-bottom: auto;
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
    flex-direction: row;
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

  .vc-day-content{
    margin: 0 !important;
  }

  #container-bottom-bar {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .content-button {
    font-size: 60%;
    padding: 0px !important;
    margin-top: 5px;
  }

  .contentCardText {
    padding: 12px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .descriptionItem {
    width: 75%;
    margin-left: 30px;
  }

  .minMaxContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .centralize-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .centralize-message {
    text-align: justify;
    margin-top: 40px;
    width: 80%;
  }

  .harvestTitle {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>