import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

// Création de l'application Vue
createApp(App)
    .use(router)
    .mount('#app');
