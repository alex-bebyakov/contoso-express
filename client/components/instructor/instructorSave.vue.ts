import { modal, datepicker } from 'vue-strap';
import {courseSelectListItem} from '../../formatters/entityFromatter';
import * as _ from 'lodash';
import {loadCourses, saveInstructor} from '../../vuex/actions';

export default {
    components: {modal, datepicker},
    props: {
        instructor: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        header() {
            return this.instructor.id ? 'Edit Instructor' : 'Create Instructor';
        },
        office() {
            return this.instructor.officeAssignment ? this.instructor.officeAssignment.location : '';
        },
        allCourses() {
            return courseSelectListItem(this.courses);
        },
        selectedCourses() {
            let result = [];
            
            _.forEach(this.instructor.courses, (course) => {
                result.push(course.id);
            });

            return result;
        }
    },
    vuex: {
        getters: {
            courses: ({courses}) => courses.list
        },
        actions: {
            loadCourses,
            saveInstructor
        }
    },
    methods: {
        cancel() {
            this.show = false;
        },
        doAction() {
            this.saveInstructor(this.instructor, this.selectedCourses);
            this.show = false;
        }
    },
    created() {
        this.loadCourses();
    }
};