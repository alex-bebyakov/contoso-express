import dbInit from '../database/database';
import Promise from 'bluebird';
import AppError from '../appError';

export default {
    init,
    getCourses,
    getCourseById,
    updateCourse,
    addCourse,
    deleteCourse
};

const db = dbInit.init();
let courseModel = db.models.Course;
let departmentModel = db.models.Department;

function init(db) {
    courseModel = db.models.Course;
    departmentModel = db.models.Department;
}

function getCourses(departmentId) {
    let options = {
        include: departmentModel,
        where: {}
    };

    if (departmentId) {
        options.where = {departmentId: departmentId};
    }

    return courseModel.findAll(options);
}

function getCourseById(id) {
    return courseModel.findById(id, {
        include: departmentModel
    });
}

function updateCourse(courseData) {
    return courseModel.findById(courseData.id)
        .then((course) => {
            if (!course) throw new AppError('app', 'course_not_found');

            course.number = courseData.number;
            course.title = courseData.title;
            course.credits = courseData.credits;
            course.departmentId = courseData.departmentId;

            return course.save();
        });
}

function addCourse(course) {
    return courseModel.create(course);
}

function deleteCourse(id) {
    return courseModel.findById(id)
        .then((course) => {
            if (!course) throw new AppError('app', 'course_not_found');

            return course.destroy();
        });
}