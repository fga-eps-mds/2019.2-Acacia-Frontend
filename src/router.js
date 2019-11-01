import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import PropertyRegistration from '@/views/PropertyRegistration.vue'
import store from './store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./views/HomePage.vue')
		},
		{
			path: '/signin',
			name: 'signin',
			component: () => import('./views/Signin.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/Signup.vue'),
      beforeEnter: ifNotAuthenticated,
		},
		{
			path: '/harvest/registration',
			name: 'harvestRegistration',
			component: () => import('./views/HarvestRegistration.vue')
		},
    {
        name: 'propertyRegistration',
        path: '/property/registration',
        component: PropertyRegistration,
        beforeEnter: ifAuthenticated,
    }
	]
})
