import { loadStudents, deleteStudent, selectStudent } from '../../vuex/actions';
const studentRow = require('./studentRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');
const studentDetails = require('./studentDetails.vue');

export default {
    components: {studentRow, simpleConfirm, studentDetails},
    data () {
        return {
            showConfirm: false,
            confirmAction: null,
            showDetailsModal: false
        };
    },
    vuex: {
        getters: {
            students: ({students}) => students.list,
            student: ({students}) => students.student
        },
        actions: {
            loadStudents,
            deleteStudent,
            selectStudent
        }
    },
    created() {
        this.loadStudents('', '', 1, 3);
    },
    methods: {
        deleteStudentAction(studentId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteStudent(studentId);
            };
        },
        studentDetailsAction(student) {
            this.selectStudent(student);
            this.showDetailsModal = true;
        }
    }
};