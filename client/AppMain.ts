import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import store from './vuex/store';
import { configRouter } from './clientRoutes';
const Main = require('./components/main.vue');

require('../node_modules/toastr/build/toastr.min.css');
require('../client/styles/app.less');

// install router
Vue.use(VueRouter);

//TODO only for dev env
Vue.config.debug = true;

// create router
const router = new VueRouter({
    history: true
});

// configure router
configRouter(router);

// bootstrap the app
const App = Vue.extend({
    template: '<main></main>',
    store,
    components: {Main}
});

(router as any).start(App, '#app div', () => {
    router.go({name: 'entities'});
});

// just for debugging
window.router = router;