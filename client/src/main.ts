import './assets/styles/_base.scss'
import './assets/styles/_navigators.scss'
import './assets/styles/_form.scss'

import { createAuth0 } from '@auth0/auth0-vue';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(
    createAuth0({
        domain: "creatd.eu.auth0.com",
        clientId: "XGz79FiEsqhSi95qC8TnGUcdhyoIVwYC",
        authorizationParams: {
            redirect_uri: 'http://localhost:5173/app'
        }
    })
);

app.mount('#app')
