import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Vue Cookie configuration */
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

/* Vue Toasted configuration */
import Toasted from 'vue-toasted'
Vue.use(Toasted)

/* Boostrap configuration */
import BoostrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BoostrapVue)

/* Font awesome configuration */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/*Datepicker configuration*/
import Datepicker from 'vuejs-datepicker'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('datepicker', Datepicker)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
