import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'

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
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    }
  ]
})
