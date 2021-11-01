import Vue from "vue"
import Router from "vue-router"
import Home from "./pages/Home.vue"
Vue.use(Router)

export default new Router({
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
            }
           ]
        }
    ]
})