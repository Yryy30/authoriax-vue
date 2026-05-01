import { createApp } from 'vue';
import App from './App.vue';

//PrimeVue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

//TanStack
import { VueQueryPlugin } from '@tanstack/vue-query'

import routes from './routes/routes_index';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark-mode',
            cssLayer: false
        }
    }
});

app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.use(VueQueryPlugin);
app.use(routes);

app.mount('#app');