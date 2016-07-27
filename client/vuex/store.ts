import * as Vue from 'vue';
import * as Vuex from 'vuex';
import students from './modules/students';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        students
    }
});