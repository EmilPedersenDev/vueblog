import './assets/main.scss'
import "primevue/resources/themes/lara-light-indigo/theme.css";

import {createApp} from 'vue'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.component("Button", Button);
app.component("Toast", Toast);

app.mount('#app')
