const coursesList = require('./course/coursesList.vue');
import {loadDepartments, changeSelectedDepartment, loadCourses} from '../vuex/actions';
import {departmentSelectListItem} from '../formatters/entityFromatter';

export default {
    components: {coursesList},
    data () {
        return {
            selectedDepartment: ''  
        };
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list
        },
        actions: {
            loadDepartments,
            changeSelectedDepartment,
            loadCourses
        }
    },
    computed: {
        departmentsDisplay() {
            return departmentSelectListItem(this.departments);
        }
    },
    methods: {
        filter() {
            this.loadCourses();
        }
    },
    created() {
        this.loadDepartments();
    }
};