/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate";

Vue.use(VueRouter)
Vue.use(Vuelidate)

import App from './components/App'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'
import Desks from './components/desks/Desks'
import ShowDesk from './components/desks/ShowDesk'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/desks',
            name: 'desks',
            component: Desks
        },
        {
            path: '/desk/:deskID',
            name: 'showDesk',
            component: ShowDesk,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
    ]
})

router.beforeEach((to, from, next)=> {
    let token = localStorage.getItem('x_xsrf_token')

    if(!token) {
        if (to.name === 'login' || to.name === 'registration'){
            return next()
        }else{
            return next({
                name: 'login'
            })
        }
    }

    if(to.name === 'login' || to.name === 'registration' && token){
        return next({
            name: 'home'
        })
    }

    next()
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: {App},
    router
});
window.axios = require('axios');

window.axios.interceptors.response.use({}, error => {
    if (error.response.status === 401 || error.response.status === 419){
        let token = localStorage.getItem('x_xsrf_token')
        if (token){
            localStorage.removeItem('x_xsrf_token')
        }
        router.push({name: 'login'})
    }
})
