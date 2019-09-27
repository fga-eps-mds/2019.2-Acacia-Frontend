import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken
  },
  state: {
    accessToken: null,
    refreshToken: null,
	},
	mutations: {
    authUser(state, userData) {
      state.accessToken = userData.accessToken
      state.refreshToken = userData.refreshToken
    },
	},
	actions: {
    login({ commit }, authData) {

    }
  }
})
