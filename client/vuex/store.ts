import * as Vue from 'vue';
import * as Vuex from 'vuex';
import students from './modules/students';
import courses from './modules/courses';
import departments from './modules/departments';
import instructors from './modules/instructors';
import enrollments from './modules/enrollments';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        students,
        courses,
        departments,
        instructors,
        enrollments,
        user
    }
});