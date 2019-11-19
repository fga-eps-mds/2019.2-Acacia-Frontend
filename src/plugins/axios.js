import Vue from 'vue'
import axios from 'axios'

import { API_URL } from '@/config'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: API_URL
        })
    }
})