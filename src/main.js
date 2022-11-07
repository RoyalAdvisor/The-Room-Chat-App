import { createApp } from 'vue'
import './index.css'
import router from "./router";
import App from './App.vue'

import { auth } from './firebase/config'
import { onAuthStateChanged } from "firebase/auth";

let app

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})

