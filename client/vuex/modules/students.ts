import {
    LOAD_STUDENTS_STATISTICS
} from '../mutationTypes';

// initial state
const state = {
    statisticsList: []
};

// mutations
const mutations = {
    [LOAD_STUDENTS_STATISTICS] (state, statistics) {
        state.statisticsList = statistics;
    }
};

export default {
    state,
    mutations
};