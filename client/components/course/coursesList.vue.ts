import {loadCourses, deleteCourse} from '../../vuex/actions';
const courseRow = require('./courseRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');

export default {
    components: {courseRow, simpleConfirm},
    data () {
        return {
            showConfirm: false,
            confirmAction: null      
        };
    },
    vuex: {
        getters: {
            courses: ({courses}) => courses.list,
            course: ({courses}) => courses.course
        },
        actions: {
            loadCourses,
            deleteCourse
        }
    },
    created() {
        this.loadCourses();
    },
    methods: {
        deleteCourseAction(courseId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteCourse(courseId);
            };
        }
    }
};