export default {
    namespaced: true,
    state: {
        message: '',
        color: ''
    },
    mutations: {
         showMessage(state, payload) {
            state.message = payload.message
            state.color = payload.color
        }
      },
  
}

