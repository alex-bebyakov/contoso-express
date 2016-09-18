import dbInit from '../database/database';
import Promise from 'bluebird';
import AppError from '../appError';

export default {
    init,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    addDepartment,
    deleteDepartment
};

const db = dbInit.init();
let departmentModel = db.models.Department;
let instructorModel = db.models.Instructor;

function init(db) {
    departmentModel = db.models.Department;
    instructorModel = db.models.Instructor;
}

function getDepartments() {
    return departmentModel.findAll({
        include: instructorModel
    });
}

function getDepartmentById(id) {
    return departmentModel.findById(id, {
        include: instructorModel
    });
}

function updateDepartment(departmentData) {
    return departmentModel.findById(departmentData.id)
        .then((department) => {
            if (!department) throw new AppError('app', 'department_not_found');

            department.name = departmentData.name;
            department.budget = departmentData.budget;
            department.startDate = departmentData.startDate;
            department.instructorId = departmentData.instructorId;

            return department.save();
        });
}

function addDepartment(department) {
    return departmentModel.create(department);
}

function deleteDepartment(id) {
    return departmentModel.findById(id)
        .then((department) => {
            if (!department) throw new AppError('app', 'department_not_found');

            return department.destroy();
        });
}