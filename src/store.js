import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

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
    noAuthRequest(state, url, requestMethod="get", data={}) {
      let finalResponse = false;
      let url = params.url
      let requestMethod = params.requestMethod
      let data = params.data
      console.log('NO AUTH REQUEST')
      console.log('URL:' + requestMethod)
      if (requestMethod.toLowerCase() === 'post')
      {
        axios.post(url, data)
          .then( response => {
            if (response.status[0] == '2') {
              finalResponse = response;
            }
          })
      }
      if (requestMethod.toLowerCase() === 'get')
      {
        axios.get(url, data)
          .then( response => {
            if (response.status[0] == '2') {
              finalResponse = response;
            }
          })
      }
      return finalResponse;
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
    },
    refreshAccessToken(state) {
      let refresh = getters.getRefreshToken();
      let data = { "refresh": refresh }
      let status = false;
      axios.post("http://0.0.0.0:8080/users/token/refresh", data)
        .then((response) => {
          if (response.status == '200') {
            status = true;
            state.accessToken = response.data['access']
          }
        })
      return status;
    },
  },
  actions: {
  }
})
