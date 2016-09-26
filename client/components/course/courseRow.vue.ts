export default {
    props: {
        course: {
            type: Object
        },        
        deleteCourseAction: {
            type: Function
        },
        courseDetailsAction: {
            type: Function
        },
        editCourseAction: {
            type: Function
        }
    },
    computed: {
        isEditable() {
            return this.course.userId === this.user.id;
        }
    },
    vuex: {
        getters: {
            user: ({user}) => user.currentUser,
        },
        actions: {}
    },
    methods: {
        deleteCourse() {
            this.deleteCourseAction(this.course.id);
        },
        showDetails() {
            this.courseDetailsAction(this.course.id);
        },
        showEdit() {
            this.editCourseAction(this.course.id);
        }
    }
};