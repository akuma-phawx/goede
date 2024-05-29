import { createApp } from 'vue';
import '@/assets/main.scss';
import 'flag-icons';
import App from '@/App.vue';
import router from '@/router/index';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-search-select/dist/VueSearchSelect.css';
import '@mdi/font/css/materialdesignicons.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'bootstrap' //

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components: {
        ...components,
    },
    directives,
    icons: {
        defaultSet: 'mdi',
    },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

createApp(App).use(vuetify).use(ToastPlugin).use(router).use(pinia).mount('#app');
