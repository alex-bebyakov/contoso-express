const instructorRow = require('./instructorRow.vue');
const instructorCoursesList = require('./instructorCoursesList.vue');
const instructorStudentsList = require('./instructorStudentsList.vue');
import {loadInstructor, loadEnrollments} from '../../vuex/actions';

export default {
    components: {instructorRow, instructorCoursesList, instructorStudentsList},
    data() {
        return {
            selectedInstructorId: 0,
            selectInstructorVisible: false,
            selectedCourseId: 0,
            selectCourseVisible: false
        };
    },
    vuex: {
        getters: {
            instructors: ({instructors}) => instructors.list,
            instructor: ({instructors}) => instructors.instructor
        },
        actions: {
            loadInstructor,
            loadEnrollments
        }
    },
    methods: {
        selectInstructorAction(instructorId) {
            this.loadInstructor(instructorId);
            this.selectedInstructorId = instructorId;
            this.selectInstructorVisible = true;
            this.selectCourseVisible = false;
        },
        selectCourseAction(courseId) {
            this.loadEnrollments(courseId);
            this.selectedCourseId = courseId;
            this.selectCourseVisible = true;
        }
    }
};