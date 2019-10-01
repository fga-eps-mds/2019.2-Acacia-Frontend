import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getAccessToken: state => {
      if (state.accessToken == null) {
        try {
          state.accessToken = Vue.cookie.get('access-token')
        } catch(e) {}
      }
      return state.accessToken
    },
    getRefreshToken: state => {
      if (state.refreshToken == null) {
        try {
          state.refreshToken = Vue.cookie.get('refresh-token')
        } catch(e) {}
      }
      return state.refreshToken
    }
  },
  state: {
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    authUser(state, userData) {
      state.accessToken = userData.accessToken
      state.refreshToken = userData.refreshToken
      Vue.cookie.set('access-token', userData.accessToken, { expires: '5d' });
      Vue.cookie.set('refresh-token', userData.refreshToken, { expires: '5d' });
    },
    logoutUser(state) {
      state.accessToken = ''
      state.refreshToken = ''
      Vue.cookie.delete('access-token');
      Vue.cookie.delete('refresh-token');
    }
  },
  actions: {
  }
})