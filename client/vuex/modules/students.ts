import {
    LOAD_STUDENTS_STATISTICS,
    LOAD_STUDENTS,
    COUNT_STUDENTS,
    SELECT_STUDENT
} from '../mutationTypes';

// initial state
const state = {
    list: [],
    student: {},
    statisticsList: [],
    totalCount: 0
};

// mutations
const mutations = {
    [LOAD_STUDENTS_STATISTICS] (state, statistics) {
        state.statisticsList = statistics;
    },
    [LOAD_STUDENTS] (state, students) {
        state.list = students;
    },
    [COUNT_STUDENTS] (state, count) {
        state.totalCount = count;
    },
    [SELECT_STUDENT] (state, student) {
        state.student = student;
    }
};

export default {
    state,
    mutations
};