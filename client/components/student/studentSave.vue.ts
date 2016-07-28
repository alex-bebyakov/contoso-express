import { modal, datepicker } from 'vue-strap';
import {saveStudent} from '../../vuex/actions';

export default{
    components: {modal, datepicker},
    props: {
        student: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        header() {
            return this.student.id ? 'Edit Student' : 'Create Student';
        }
    },
    vuex: {
        actions: {
            saveStudent
        }
    },
    methods: {
        cancel() {
            this.show = false;
        },
        doAction() {
            this.saveStudent(this.student);
            this.show = false;
        }
    }
};