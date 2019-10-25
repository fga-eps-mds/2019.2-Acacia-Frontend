import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import PropertyRegistration from '@/views/PropertyRegistration.vue'

Vue.use(Router)

const routes = [{
    name: 'home',
    path: '/',
    component: HomePage
}, {
    name: 'signin',
    path: '/signin',
    component: Signin
}, {
    name: 'signup',
    path: '/signup',
    component: Signup
}, {
    name: 'propertyRegistration',
    path: '/property/registration',
    component: PropertyRegistration
}]

const router = new Router({
    mode: 'history',
    routes
})

export default router