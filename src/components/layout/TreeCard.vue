<template>
  <div
    class="tree-card"
  >
    <v-card
      v-if="hasTree"
      height="125"
      width="265"
      class="justify-right card-style"
    >
      <v-btn
        icon
        color="#56A3A6"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card>

    <v-card
      v-else
      height="125"
      width="265"
      class="card-style"
    >
    
    <div
      class="centralize-message raleway-regular"
    >
      <h4> Nenhuma árvore encontrada </h4>
    </div>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'TreeCard',
    props: {
      hasTree: {
        default: true,
        type: Boolean,
      },
    },
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
  }

  .card-style{
    background-color: white !important;
    border-radius: 12px !important;
  }

  .centralize-message{
    text-align: justify;
    width: 80%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>