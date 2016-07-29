import { modal } from 'vue-strap';
import {departmentSelectListItem} from '../../formatters/entityFromatter';
import {saveCourse} from '../../vuex/actions';

export default {
    components: {modal},
    props: {
        course: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        header() {
            return this.course.id ? 'Edit Course' : 'Create Course';
        },
        departmentsDisplay() {
            return departmentSelectListItem(this.departments);
        }
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list,
        },
        actions: {
            saveCourse
        }
    },
    methods: {
        cancel() {
            this.show = false;
        },
        doAction() {
            this.saveCourse(this.course);
            this.show = false;
        }
    }  
};