import {loadDepartments} from '../../vuex/actions';
const departmentRow = require('./departmentRow.vue');

export default {
    components: {departmentRow},
    vuex: {
        getters: {
            departments: ({departments}) => departments.list
        },
        actions: {
            loadDepartments
        }
    },
    created() {
        this.loadDepartments();
    }
};