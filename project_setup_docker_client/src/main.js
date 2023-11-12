import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import fullScreen from 'vue-fullscreen';
import App from './App.vue';
import router from './router';
import store from './store';
import utils from './utils';
import guard from './utils/guard';
import 'ol/ol.css';
import './registerServiceWorker';
import i18n from './i18n';
import './tailwind.css';
import './main.css';
import './mapBox.css';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

Vue.use(utils);
Vue.use(VueTheMask);
Vue.use(guard);
Vue.use(fullScreen);

Vue.config.productionTip = false;
Vue.filter('ucFirst', (value) => {
    if (value.length > 0) {
        return value[0].toUpperCase() + value.substring(1);
    }
    return value;
});

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
