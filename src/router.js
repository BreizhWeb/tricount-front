import LoginView from './components/Login.vue'
import RegisterView from './components/Register.vue'
import HomeView from './components/Home.vue'

// Importation des fonctions de création de route de Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Définition des routes de l'application
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

// Création de l'objet router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;