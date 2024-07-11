import './assets/main.css'
import 'primeicons/primeicons.css'
import 'animate.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'






//Block with prime components

import Button from 'primevue/button'
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			prefix: 'p',
			darkModeSelector: 'system',
			cssLayer: false
		}
	}
});

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);

app.mount('#app')
