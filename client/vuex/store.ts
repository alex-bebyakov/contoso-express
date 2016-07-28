import * as Vue from 'vue';
import * as Vuex from 'vuex';
import students from './modules/students';
import courses from './modules/courses';
import departments from './modules/departments';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        students,
        courses,
        departments
    }
});