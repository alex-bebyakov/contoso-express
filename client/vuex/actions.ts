import helper from '../helpers/uiHelper';
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

export const selectStudent = (store, student) => {
    store.dispatch(types.SELECT_STUDENT, student);
};