import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { access } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
  },
  state: {
    accessToken: null,
    refreshToken: null,
    baseURL: "http://0.0.0.0:8080/",
    /* === Token getters === */
    getAccessToken: function () {
      if (this.accessToken == null) {
        try {
          this.accessToken = Vue.cookie.get('access-token')
        } catch (e) { }
      }
      return this.accessToken
    },
    getRefreshToken: function () {
      if (this.refreshToken == null) {
        try {
          this.refreshToken = Vue.cookie.get('refresh-token')
        } catch (e) { }
      }
      return this.refreshToken
    },
    /* === Token setters === */
    setAccessToken: function (accessToken) {
      this.accessToken = accessToken
      Vue.cookie.set('access-token', accessToken, { expires: '10d' });
    },
    setRefreshToken: function (refreshToken) {
      this.refreshToken = refreshToken
      Vue.cookie.set('refresh-token', refreshToken, { expires: '5m' });
    },
    /* === Access token refresh function === */
    accessTokenRefresh: function () {
      let url = this.baseURL + 'users/token/refresh/'
      let store = this
      return new Promise(function (resolveBase, rejectBase) {
        axios.post(url, { "refresh": store.getRefreshToken() })
          .then(response => {
            if (response.data['access']) {
              store.setAccessToken(response.data['access']);
              resolveBase();
            } else {
              rejectBase();
            }
          })
          .catch(() => rejectBase())
      })
    },
    /* === Access Token test function === */
    testAndRefreshAccessToken: function () {
      let url = this.baseURL + 'users/test-access-token/'
      let store = this
      return new Promise(function (resolveBase, rejectBase) {
        const config = {
          headers: { 'Authorization': "Bearer " + store.getAccessToken() }
        }
        axios.post(url, {}, config)
          .then(() => {
            resolveBase();
          })
          .catch(() => {
            store.accessTokenRefresh()
              .then(() => {
                resolveBase();
              })
              .catch(() => {
                rejectBase();
              })
          })
      })
    },
    /* === Request functions === */
    // THEY WORK WITH PROMISSES
    // Example code of making an authorized request to check user's chosen language:
    // this.$store.state.authRequest("users/prefered-language", "GET", {})
    //  .then(response => {
    //    [CODE THAT RUNS WHEN REQUEST GOES OK]
    //    [response IS THE AXIOS RESPONSE FOR REQUEST]
    //  })
    //  .catch(error => {
    //    [WHEN REQUEST FAILS]
    //    if (error === false) [USER IS NOT LOGGED IN]
    //    else if (error === {}) [YOU HAVE INPUT A WRONG METHOD, ONLY GET AND POST ARE ALLOWED] 
    //    else [THIS IS THE SAME AS response, BUT THE SERVER RETURNED AN ERROR INSTEAD OF A 2xx MESSAGE]
    //  })

    // Do a request with a no authentication required
    // In case method is not valid, returns {}
    noAuthRequest: function (path, method = "GET", data = {}) {
      let url = this.baseURL + path;
      if (url.substr(-1) != '/') { url += '/' }
      return new Promise(function (resolve, reject) {
        if (method.toLowerCase() === "get") {
          axios.get(url, data)
            .then(response => {
              if (response.status.toString()[0] == 2) {
                resolve(response);
              } else {
                reject(response);
              }
            })
        } else if (method.toLowerCase() === "post") {
          axios.post(url, data)
            .then(response => {
              if (response.status.toString()[0] == 2) {
                resolve(response);
              } else {
                reject(response);
              }
            })
        } else {
          reject({});
        }
      })
    },
    // Do a request with authentication required
    // It will try the current access token, if it fails, it gets another
    // access token in case the refresh token is valid.
    // If refresh is not valid, it returns false
    // It returns {} in case method is not valid
    authRequest: function (path, method = "GET", data = {}) {
      let url = this.baseURL + path;
      let store = this
      if (url.substr(-1) != '/') { url += '/' }
      return new Promise(function (resolveBase, rejectBase) {
        store.testAndRefreshAccessToken()
          .then(() => {
            let headers = {
              "Authorization": "Bearer " + store.getAccessToken()
            }
            if (method.toLowerCase() === "get") {
              axios.get(url, data, { headers: headers })
                .then(response => {
                  if (response.status.toString()[0] == 2) {
                    resolveBase(response.data);
                  } else {
                    rejectBase(response);
                  }
                })
                .catch(response => rejectBase(response))
            } else if (method.toLowerCase() === "post") {
              axios.post(url, data, { headers: headers })
                .then(response => {
                  if (response.status.toString()[0] == 2) {
                    resolveBase(response.data);
                  } else {
                    rejectBase(response);
                  }
                })
                .catch(response => rejectBase(response))

            } else {
              rejectBase({});
            }
          })
          .catch(() => rejectBase(false))
      })
    },
  },
  mutations: {
    authUser(state, userData) {
      state.setAccessToken(userData.accessToken)
      state.setRefreshToken(userData.refreshToken)
    },
    logoutUser(state) {
      state.accessToken = null
      state.refreshToken = null
      Vue.cookie.delete('access-token');
      Vue.cookie.delete('refresh-token');
    }
  },
  actions: {
  }
})
