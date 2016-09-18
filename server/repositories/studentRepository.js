import dbInit from '../database/database';
import Promise from 'bluebird';
import AppError from '../appError';

export default {
    init,
    getStudentStatistics,
    getStudents,
    getStudentById,
    updateStudent,
    addStudent,
    deleteStudent
};

const db = dbInit.init();
let studentModel = db.models.Student;
let enrollmentModel = db.models.Enrollment;
let courseModel = db.models.Course;

function init(db) {
    studentModel = db.models.Student;
    enrollmentModel = db.models.Enrollment;
    courseModel = db.models.Course;
}

function getStudentStatistics() {
    let queryString = 'SELECT enrollment_date, COUNT(*) AS "studentCount" FROM students GROUP BY enrollment_date';

    return db.sequelize.query(queryString)
        .then((data) => {
            return data[0];
        });
}

function getStudents(search, sortOrder, pageNumber, pageSize) {
    let orderParams = getSortOrder(sortOrder);

    let options = {
        where: {
            $or: [
                {firstName: {$like: `%${search}%`}},
                {lastName: {$like: `%${search}%`}}
            ]
        },
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
        order: [[orderParams.order, orderParams.direction]]
    };
    
    return studentModel.findAndCountAll(options);
}

function getStudentById(id) {
    return studentModel.findById(id, {
        include: [
            {model: enrollmentModel, include: [courseModel]}
        ]}
    );
}

function updateStudent(student) {
    return studentModel.findById(student.id)
        .then((data) => {
            if (!data) throw new AppError('app', 'student_not_found');

            data.firstName = student.firstName;
            data.lastName = student.lastName;
            data.enrollmentDate = student.enrollmentDate;

            return data.save();
        });
}

function addStudent(student) {
    return studentModel.create(student);
}

function deleteStudent(id) {
    return studentModel.findById(id)
        .then((student) => {
            if (!student) throw new AppError('app', 'student_not_found');

            return student.destroy();
        });
}

function getSortOrder(sortOrder) {
    let result = {};

    switch (sortOrder) {
        case 'name':
            result = {order: 'lastName', direction: 'ASC'};
            break;
        case 'date':
            result = {order: 'enrollmentDate', direction: 'ASC'};
            break;
        case 'date_desc':
            result = {order: 'enrollmentDate', direction: 'DESC'};
            break;
        default:
            result = {order: 'lastName', direction: 'DESC'};
            break;
    }

    return result;
}