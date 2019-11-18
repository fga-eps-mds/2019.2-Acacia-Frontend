<template>
  <v-snackbar 
    v-model="show"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
    :absolute="absolute"
  >
    {{ message }}
    <v-btn 
      text 
      @click="show=false; $emit('reset')"
    >
      Reset
    </v-btn>
  </v-snackbar>
</template>

<script>

export default {
  data () {
    return {
      show: false,
      message: 'Sem mensagens',
      color: 'success',
      mode: '',
      timeout: 5000,
      x: 'right',
      y: 'top',
      absolute: false,
    }
  },
 
  created () {
   this.$store.subscribe((mutation, state) => {
      
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.message
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>