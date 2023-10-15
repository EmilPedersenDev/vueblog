import './assets/main.scss'
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

import {createApp} from 'vue'
import {createPinia} from "pinia";

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';

const pinia = createPinia();
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue);
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.component("Button", Button);
app.component("Toast", Toast);

app.mount('#app')
