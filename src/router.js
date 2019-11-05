import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import CalendarPage from '@/views/CalendarPage.vue'
import PropertyRegistration from '@/views/PropertyRegistration.vue'
import HarvestRegistration from '@/views/HarvestRegistration'
import TreeRegistration from '@/views/TreeRegistration'
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
            component: TreeRegistration
        }
    ]
})