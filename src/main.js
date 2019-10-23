import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Vuetify configuration */
import vuetify from './plugins/vuetify';

/* Vue Cookie configuration */
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

/* Vue Toasted configuration */
import Toasted from 'vue-toasted'
Vue.use(Toasted)

/* i18n configuration (internationalization) */
import i18n from '@/plugins/i18n'

/* Flag-Icon configuration */
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon)

/* Boostrap configuration */
import BoostrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BoostrapVue)

/* Font awesome configuration */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
