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
      />

      <div id="container-bottom-bar">
        <font-awesome-icon
          :icon="iconBottomBar"
          style="color: white;"
          @click="select()"
        />
      </div>

    </div>
  </div>
</template>

<script>
import TopBar from '@/components/layout/TopBar'

export default {
  data() {
    return {
      height: "height-100",
      iconBottomBar: "chevron-up",
    }
  },

  components: {
		TopBar,
  },

  methods: {
    select() {
      console.log(this.iconBottomBar);
      if (this.iconBottomBar == "chevron-up") {
        this.height = "height-60";
        this.iconBottomBar = "chevron-down";
      }

      else if (this.iconBottomBar == "chevron-down") {
        this.height = "height-100";
        this.iconBottomBar = "chevron-up";
      }
    },
  }
}
</script>

<style>

  .height-60 {
    height: 60%;
    transition-duration: 0.4s;
  }

  .height-100 {
    height: 100%;
    transition-duration: 0.4s;
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