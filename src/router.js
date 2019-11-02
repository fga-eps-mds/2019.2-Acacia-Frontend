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
    routes: [{
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            name: 'propertyRegistration',
            path: '/property/registration',
            component: PropertyRegistration,
            beforeEnter: ifAuthenticated,
        }
    ]
})
