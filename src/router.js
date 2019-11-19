import Vue from 'vue'
import Router from 'vue-router'

import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import LandingPage from '@/views/LandingPage'
import CalendarPage from '@/views/CalendarPage'
import PropertyRegistration from '@/views/PropertyRegistration'
import HarvestRegistration from '@/views/HarvestRegistration'
import TreeRegistration from '@/views/TreeRegistration'
import UserUpdate from '@/views/UserUpdate'
import Dashboard from '@/views/Dashboard'
import Property from '@/views/Property'
import store from './store'
import HarvestView from '@/views/HarvestView'

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
    name: 'landingpage',
    component: LandingPage,
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
    name: 'treeRegistration',
    path: '/tree/registration',
    component: TreeRegistration,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/harvest/:property_id/:harvest_id',
    name: 'harvestView',
    component: HarvestView,
    props: true,
  },
  {
    path: '/user/update',
    name: 'userupdate',
    component: UserUpdate,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/property/:pk',
    name: 'property',
    component: Property,
  },
]
})
