import helper from '../helpers/uiHelper';
import dateFormatter from '../formatters/dateFormatter';
import * as types from './mutationTypes';
import * as _ from 'lodash';
import studentService from '../services/studentService';

export const loadStudentsStatistics = (store) => {
    const {dispatch, state} = store;

    return studentService.getStudentsStatistics()
        .then(statistics => {
            dispatch(types.LOAD_STUDENTS_STATISTICS, statistics);
        }).catch(error => {
            throw(error);
        });
};

export const loadStudents = (store, search, sortOrder, pageNumber, pageSize) => {
    const {dispatch, state} = store;

    return studentService.getStudents(search, sortOrder, pageNumber, pageSize)
        .then(data => {
            dispatch(types.LOAD_STUDENTS, data.rows);
            dispatch(types.COUNT_STUDENTS, data.count);
        }).catch(error => {
            throw(error);
        });
};

export const deleteStudent = (store, studentId) => {
    return studentService.deleteStudent(studentId)
        .then(() => {
            helper.showMessage(`The student is removed successfully`);
            loadStudents(store, '', '', 1, 3);
        }).catch(error => {
            throw(error);
        });
};

export const loadStudent = (store, studentId) => {
    const {dispatch, state} = store;

    let action: any = Promise.resolve(null);

    if (_.isNumber(studentId)) {
        action = studentService.getStudent(studentId);
    }

    return action
        .then(student => {
            if (!student) {
                student = {
                    firstName: '',
                    lastName: '',
                    enrollmentDate: dateFormatter.currentDate()
                };
            }

            store.dispatch(types.LOAD_STUDENT, student);
        })
        .catch(error => {
            throw(error);
        });
};

export const saveStudent = (store, student) => {
    return studentService.saveStudent(student)
        .then(() => {
            let message = student.id ? 'The student was updated successfully' : 'The student was added successfully';
            helper.showMessage(message);
            loadStudents(store, '', '', 1, 3);
        });
};