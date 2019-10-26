import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import PropertyRegistration from '@/views/PropertyRegistration.vue'
import TreeRegistration from '@/views/PropertyRegistration.vue'


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
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            name: 'propertyRegistration',
            path: '/property/registration',
            component: PropertyRegistration
        },
        {
            name: 'treeRegistration',
            path: '/tree/registration',
            component: TreeRegistration
        }
    ]
})