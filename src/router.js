import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/HomePage.vue')
        },
        {
            path: '/signin',
            name: 'signin',
            component: () =>
                import ('./views/Signin.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () =>
                import ('./views/Signup.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () =>
                import ('./views/Dashboard.vue')
        },
        {
            path: '/harvest/registration',
            name: 'harvestRegistration',
            component: () =>
                import ('./views/HarvestRegistration.vue')
        },
    ]
})