import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import i18n from '@/plugins/i18n.js'

export default new Vuex.Store({
  getters: {
  },
  state: {
    defaultLanguage: 'en',
    baseURL: "http://0.0.0.0:8000/",
    /* === Language helper functions === */
    resolveUserLanguage: function() {
      let resolvedUserLanguage = Vue.cookie.get('resolved-user-language')
      if (resolvedUserLanguage) {
        i18n.locale = resolvedUserLanguage
        return
      }
      let language = this.defaultLanguage;
      let state = this
      state.authRequest(
        'users/prefered-language/',
        'GET'
      )
        .then(res => {
          let lang = res.data['chosen_language'];
          language = lang;
          state.setCookieLanguage(lang); // cookies
        })
        .catch(() => {
          let cookieLang = state.getCookieLanguage()

          if (cookieLang) {
            language = cookieLang
          }
        })
        .finally(() => {
          i18n.locale = language;
        })
    },
    setUserLanguage(lang) {
      let state = this
      i18n.locale = lang
      state.setCookieLanguage(lang)
      Vue.cookie.set('resolved-user-language', lang)
      /* It doesn't really matter if the user is not logged in, fails graciously */
      if (state.getAccessToken() && state.getRefreshToken()) {
        state.authRequest('users/prefered-language', 'PATCH', {
          'chosen_language' : lang
        })
        .then(() => {})
        .catch(() => {})
      }
    },
    /* === Token getters === */
    getAccessToken: () => { return Vue.cookie.get('access-token') },
    getRefreshToken: () => { return Vue.cookie.get('refresh-token') },
    /* === Token setters === */
    setAccessToken: (accessToken) => Vue.cookie.set('access-token', accessToken, { expires: '5m' }),
    setRefreshToken: (refreshToken) => Vue.cookie.set('refresh-token', refreshToken, { expires: '10d' }),
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
      let url = this.baseURL + 'users/token/test-access-token/'
      let store = this
      return new Promise(function (resolveBase, rejectBase) {
        const config = {
          'headers': { 'Authorization': "Bearer " + store.getAccessToken() }
        }
        axios.get(url, config)
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
    /*
     __
    /  \
    |  |
    \__/

    */
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
              axios.get(url, { headers: headers })
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
                    resolveBase(response);
                  } else {
                    rejectBase(response);
                  }
                })
                .catch(response => rejectBase(response))
            } else if (method.toLowerCase()==="patch" || method.toLowerCase() ==="put") {
              axios.patch(url, data, { headers: headers })
                .then(response => {
                  if (response.status.toString()[0] == 2) {
                    resolveBase(response);
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

    authUser(userData) {
      this.setAccessToken(userData.accessToken)
      this.setRefreshToken(userData.refreshToken)
      Vue.cookie.delete('resolved-user-language')
    },

    setCookieLanguage: (lang) => Vue.cookie.set('prefered-language', lang),
    getCookieLanguage: () => { return Vue.cookie.get('prefered-language') },

  },
  mutations: {
    logoutUser() {
      Vue.cookie.delete('access-token');
      Vue.cookie.delete('refresh-token');
      Vue.cookie.delete('prefered-language');
    }
  },
  actions: {
  }
})
