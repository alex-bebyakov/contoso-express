import dbInit from '../database/database';
import Promise from 'bluebird';

export default {
    init,
    getEnrollmentsByCourseId
};

const db = dbInit.init();
let enrollmentModel = db.models.Enrollment;
let studentModel = db.models.Student;

function init(db) {
    enrollmentModel = db.models.Enrollment;
    studentModel = db.models.Student;
}


function getEnrollmentsByCourseId(courseId) {
    let options = {
        where: {courseId: courseId},
        include: studentModel
    };
    
    return enrollmentModel.findAll(options);
}