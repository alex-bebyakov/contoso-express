import {loadCourses} from '../../vuex/actions';
const courseRow = require('./courseRow.vue');

export default {
    components: {courseRow},
    vuex: {
        getters: {
            courses: ({courses}) => courses.list,
            course: ({courses}) => courses.course
        },
        actions: {
            loadCourses
        }
    },
    created() {
        this.loadCourses();
    }
};