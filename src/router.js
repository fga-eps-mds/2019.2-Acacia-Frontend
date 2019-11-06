import Vue from 'vue'
import Router from 'vue-router'

import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import HomePage from '@/views/HomePage'
import LadingPage from '@/views/LandingPage'
import CalendarPage from '@/views/CalendarPage'
import PropertyRegistration from '@/views/PropertyRegistration'
import HarvestRegistration from '@/views/HarvestRegistration'
import Dashboard from '@/views/Dashboard'
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
    },
    {
      name: 'harvestRegistration',
      path: '/harvest/registration',
      component: HarvestRegistration,
      beforeEnter: ifAuthenticated,
    },
    {
      name: 'calendar',
      path: '/calendar/',
      component: CalendarPage,
    },                          
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/landing',
      name: 'landingPage',
      component: LadingPage,
    },
  ]
})