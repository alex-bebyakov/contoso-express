import dateFormatter from '../../formatters/dateFormatter';

export default {
    props: {
        student: {
            type: Object
        },
        deleteStudentAction: {
            type: Function
        },
        studentDetailsAction: {
            type: Function
        },
        editStudentAction: {
            type: Function
        }
    },
    computed: {
        enrollmentDateDisplay() {
            return dateFormatter.date(this.student.enrollmentDate);
        },
        isEditable() {
            return this.student.userId === this.user.id;
        }
    },
    vuex: {
        getters: {
            user: ({user}) => user.currentUser,
        },
        actions: {}
    },
    methods: {
        deleteStudent() {
            this.deleteStudentAction(this.student.id);
        },
        showDetails() {
            this.studentDetailsAction(this.student.id);
        },
        showEdit() {
            this.editStudentAction(this.student.id);
        }
    }
};