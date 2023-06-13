import LoginView from './components/Login.vue'
import RegisterView from './components/Register.vue'
import HomeView from './components/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes=[
    {
        name:'Login',
        component:LoginView,
        path:'/'
    },
    {
        name:'Register',
        component:RegisterView,
        path:'/register'
    },
    {
        name:'Home',
        component:HomeView,
        path:'/home'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;