import dateFormatter from '../../formatters/dateFormatter';

export default {
    props: {
        instructor: {
            type: Object
        },
        selectedInstructorId: {
            type: Number
        },
        selectInstructorAction: {
            type: Function
        }
    },
    computed: {
        office() {
            return this.instructor.officeAssignment ? this.instructor.officeAssignment.location : '';
        },
        hireDateDisplay() {
            return dateFormatter.date(this.instructor.hireDate);   
        },
        active() {
            return this.selectedInstructorId === this.instructor.id ? true : false;
        }
    },
    methods: {
        selectInstructor() {
            this.selectInstructorAction(this.instructor.id);
        }
    }
};