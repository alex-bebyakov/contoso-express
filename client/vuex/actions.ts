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