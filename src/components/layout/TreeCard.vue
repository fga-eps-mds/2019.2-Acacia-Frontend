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
    height: 130px;
    width: 265px;
    border-radius: 12px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    margin-left: 30px;
    background: white;
  }

  .justify-right{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>