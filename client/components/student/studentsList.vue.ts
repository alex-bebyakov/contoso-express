import { loadStudents, deleteStudent, loadStudent } from '../../vuex/actions';
const studentRow = require('./studentRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');
const studentDetails = require('./studentDetails.vue');
const studentSave = require('./studentSave.vue');

export default {
    components: {studentRow, simpleConfirm, studentDetails, studentSave},
    data () {
        return {
            showConfirm: false,
            confirmAction: null,
            showDetailsModal: false,
            showEditModal: false
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
            loadStudent
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
        studentDetailsAction(studentId) {
            this.loadStudent(studentId);
            this.showDetailsModal = true;
        },
        editStudentAction(studentId) {
            this.loadStudent(studentId);
            this.showEditModal = true;
        }
    }
};