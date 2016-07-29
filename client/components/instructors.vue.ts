const instructorsList = require('./instructor/instructorsList.vue');
import {loadInstructors} from '../vuex/actions';

export default {
    components: {instructorsList},
    vuex: {
        getters: {
            instructors: ({instructors}) => instructors.list
        },
        actions: {
            loadInstructors
        }
    },
    created() {
        this.loadInstructors();
    }
};