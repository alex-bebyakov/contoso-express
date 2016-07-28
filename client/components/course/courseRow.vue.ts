export default {
    props: {
        course: {
            type: Object
        },        
        deleteCourseAction: {
            type: Function
        }
    },
    methods: {
        deleteCourse() {
            this.deleteCourseAction(this.course.id);
        }
    }
};