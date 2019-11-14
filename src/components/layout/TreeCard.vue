<template>
  <div
    class="tree-card"
  >
    <v-card
      height="125"
      width="265"
      class="justify-right"
    >
      <v-btn
        icon
        color="#56A3A6"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'TreeCard',
  }
</script>

<style>
  .tree-card{
    height: 129px;
    width: 268px;
    border-radius: 12px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: #56A3A6;
    margin-left: auto;
    margin-right: auto;
  }

  .justify-right{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: white !important;
    border-radius: 12px !important;
  }
</style>