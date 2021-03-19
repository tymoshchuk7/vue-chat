import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/firebase'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'

createApp(App).use(router).mount('#app')
