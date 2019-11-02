<template>
  <div class="calendar-page">
    <TopBar
      iconleft="bars"
      iconright="plus"
      color="white"
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

    <div v-bind:class="hideCards">
      <div class="card" style="width: 18rem;">

        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>

        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'

export default {

  computed: {

    hideCards: function () {
      return {
        'display-none': this.iconBottomBar === "chevron-up"
      }
    },

    atributos: function() {
      let attrs = [{
        highlight: {
          color: 'purple',
          class: 'detail-highlight'
        },

        dates: this.dates,

        popover: {
          label: 'Leo lindo',
          visibility: 'focus'
        },
      }]

      if (this.iconBottomBar == "chevron-up") {
        attrs[0]['highlight'].class = 'highlight'
        return attrs
      }

      else if (this.iconBottomBar == "chevron-down") {
        return attrs
      }
    },
  },

  data() {
    return {
      selectedDay: null,
      height: "height-100",
      iconBottomBar: "chevron-up",

      dates: [
        new Date(2019, 10, 1),
        new Date(2019, 10, 2),
      ],

      dates_info: {
        '2019-11-02': {
          colheitas: [
            {
              nome: 'Babadeira',
            },

            {
              nome: 'Pisadeira',
            },
          ]
        }

      },
    }
  },

  components: {
    TopBar,
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

    dayClicked(day) {

      if(!(day.id in this.dates_info)) {
        return;
      }

      // console.log(this.dates_info[day.id]['colheitas']);
      let colheitas = this.dates_info[day.id]['colheitas'];

      console.log(colheitas)

      for (var [key, value] of Object.entries(colheitas)) {
        console.log(value['nome']);
      }

      this.height = "height-60";
      this.iconBottomBar = "chevron-down";
    }
  }
}
</script>

<style>

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

  #calendar{
    background-color: rgba(6,6,6, 0);
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