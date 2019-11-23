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
      <div
        class="centralize-title raleway-regular"
      >
        <h4
          v-if="treeType=='Avocado'"
        > 
          {{ avocadoTranslation }}
        </h4>
        <h4
          v-else-if="treeType=='Pineapple'"
        >
          {{ pineappleTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Banana'"
        >
          {{ bananaTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Persimmon'"
        >
          {{ persimmonTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Coconut'"
        >
          {{ coconutTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='FIG'"
        >
          {{ figTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Guava'"
        >
          {{ guavaTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Jabuticaba'"
        >
          {{ jabuticabaTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Orange'"
        >
          {{ orangeTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Lemon'"
        >
          {{ lemonTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Apple'"
        >
          {{ appleTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Papaya'"
        >
          {{ papayaTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Mango'"
        >
          {{ mangoTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Passion Fruit'"
        >
          {{ passionfruitTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Quince'"
        >
          {{ quinceTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Nectarine'"
        >
          {{ nectarineTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Loquat'"
        >
          {{ loquatTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Pear'"
        >
          {{ pearTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Pequizeiro'"
        >
          {{ pequizeiroTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Tangerine'"
        >
          {{ tangerineTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Peach'"
        >
          {{ peachTranslation }}
        </h4>

        <h4
          v-else-if="treeType=='Vine'"
        >
          {{ vineTranslation }}
        </h4>

        <h4
          v-else
        >
          Lula Livre
        </h4>
      </div>
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
        <h4> {{ this.$t('PropertyView.notrees') }} </h4>
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

      treeType: {
        default: '',
        type: String,
      },
    },

    computed: {
      avocadoTranslation: function() {
        return this.$t('TypeOfTrees.avocado')
      },
      
      pineappleTranslation: function() {
        return this.$t('TypeOfTrees.pineapple')        
      },

      bananaTranslation: function() {
        return this.$t('TypeOfTrees.banana')
      },

      persimmonTranslation: function() {
        return this.$t('TypeOfTrees.persimmon')
      },

      coconutTranslation: function() {
        return this.$t('TypeOfTrees.coconut')
      },

      figTranslation: function() {
        return this.$t('TypeOfTrees.fig')
      },

      guavaTranslation: function() {
        return this.$t('TypeOfTrees.guava')
      },

      jabuticabaTranslation: function() {
        return this.$t('TypeOfTrees.jabuticaba')
      },

      orangeTranslation: function() {
        return this.$t('TypeOfTrees.orange')        
      },

      lemonTranslation: function() {
        return this.$t('TypeOfTrees.lemon')        
      },

      appleTranslation: function() {
        return this.$t('TypeOfTrees.apple')        
      },

      papayaTranslation: function() {
        return this.$t('TypeOfTrees.papaya')
      },

      mangoTranslation: function() {
        return this.$t('TypeOfTrees.mango')
      },

      passionfruitTranslation: function() {
        return this.$t('TypeOfTrees.passionfruit')
      },

      quinceTranslation: function() {
        return this.$t('TypeOfTrees.quince')
      },

      nectarineTranslation: function() {
        return this.$t('TypeOfTrees.nectarine')
      },

      loquatTranslation: function() {
        return this.$t('TypeOfTrees.loquat')
      },

      pearTranslation: function() {
        return this.$t('TypeOfTrees.pear')
      },

      pequizeiroTranslation: function() {
        return this.$t('TypeOfTrees.pequizeiro')
      },

      tangerineTranslation: function() {
        return this.$t('TypeOfTrees.tangerine')        
      },

      peachTranslation: function() {
        return this.$t('TypeOfTrees.peach')
      },

      vineTranslation: function() {
        return this.$t('TypeOfTrees.vine')
      },
    }
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

  .centralize-title{
    text-align: justify;
    width: 80%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h4{
    color: black;
  }
</style>