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
        }
    },
    computed: {
        enrollmentDateDisplay() {
            return dateFormatter.date(this.student.enrollmentDate);
        }
    },
    methods: {
        deleteStudent() {
            this.deleteStudentAction(this.student.id);
        },
        showDetails() {
            this.studentDetailsAction(this.student);
        }
    }
};