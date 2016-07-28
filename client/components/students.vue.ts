const studentsList = require('./student/studentsList.vue');
const studentSave = require('./student/studentSave.vue');
import { loadStudent } from '../vuex/actions';

export default {
    components: {studentsList, studentSave},
    data() {
        return {
            showAddModal: {
                type: Boolean,
                default: false
            }
        };
    },
    vuex: {
        getters: {
            student: ({students}) => students.student
        },
        actions: {
            loadStudent
        }
    },
    methods: {
        showAdd() {
            this.loadStudent(null);
            this.showAddModal = true;
        }
    }
};