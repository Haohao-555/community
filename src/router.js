import Vue from "vue"
import Router from "vue-router"
import Home from "./pages/Home.vue"

import Cookie from 'vue-cookie'
import constant from './conf/constant'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index',
            children:[{
                path: '/index',
                name: 'Index',
                component: () => import("./pages/Index.vue")
            },{
                path: '/attention',
                name: "Attention",
                component: () => import("./pages/Attention.vue")
            },{
                path: '/leisure',
                name: 'Leisure',
                component: () => import("./pages/Leisure.vue")
            }, {
                path: "/private",
                name: "Private",
                component: () => import("./pages/Private.vue")
            }
           ]
        },{
            path: '/register',
            name: 'Register',
            component: () => import('./pages/Register.vue')
        },{
            path: '/login',
            name: 'Login',
            component: () => import('./pages/Login.vue')
        },{
            path: '/updateInformation',
            name: 'Formation',
            component: () => import('./pages/formation.vue')
        },{
            path: '/updatepaw',
            name: 'Updatepaw',
            component: () => import('./pages/updatepaw.vue')
        },{
            path: '/personal',
            name: 'Personal',
            component: () => import('./pages/personal.vue')
        }, {
            path: '/social',
            name: 'Social',
            component: () => import('./pages/social.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next()
    } else if (to.path == "/register") {
        next()
    } else {
        if (Cookie.get(constant.COOKIE)) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router