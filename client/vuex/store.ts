import * as Vue from 'vue';
import * as Vuex from 'vuex';
import entities from './modules/entities';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        entities
    }
});