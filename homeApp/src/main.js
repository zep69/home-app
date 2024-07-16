import './assets/main.css'
import 'primeicons/primeicons.css'
import 'animate.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {useUserStore} from "./stores/counter";


//Block with prime components

import Button from 'primevue/button'
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';


import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const app = createApp(App)



app.use(createPinia())
app.use(router)
const userStore = useUserStore()
console.log(userStore.userData)
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
app.component('Toolbar', Toolbar);
app.component('Dialog', Dialog);
app.component('Menu', Menu);


app.mount('#app')
