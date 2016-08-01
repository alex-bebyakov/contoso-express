import {loadDepartments, deleteDepartment} from '../../vuex/actions';
const departmentRow = require('./departmentRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');

export default {
    components: {departmentRow, simpleConfirm},
    data() {
        return {
            showConfirm: false,
            confirmAction: null      
        };
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list
        },
        actions: {
            loadDepartments,
            deleteDepartment
        }
    },
    created() {
        this.loadDepartments();
    },
    methods: {
        deleteDepartmentAction(departmentId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteDepartment(departmentId);
            };
        }
    }
};