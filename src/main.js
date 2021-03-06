import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Axios configuration */
import './plugins/axios'

/* Vuetify configuration */
import vuetify from './plugins/vuetify';

/* Vue Vuelidate configuration */
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

/* Vue Cookie configuration */
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

/* i18n configuration (internationalization) */
import i18n from '@/plugins/i18n'

/* Flag-Icon configuration */
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon)

import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
    componentPrefix: 'vc',
});

/* Boostrap configuration */
import BoostrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BoostrapVue)

/* Font awesome configuration */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
library.add(fas, fab)

/*Datepicker configuration*/
import Datepicker from 'vuejs-datepicker'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('datepicker', Datepicker)


Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')