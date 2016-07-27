import { modal } from 'vue-strap';
const displayRow = require('../elements/displayRow.vue');
import dateFormatter from '../../formatters/dateFormatter';

export default{
    components: {modal, displayRow},
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
        enrollmentDate() {
            return dateFormatter.date(this.student.enrollmentDate);
        }
    },
    methods: {
        cancel() {
            this.show = false;
        }
    }
};