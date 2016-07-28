import {
    LOAD_DEPARTMENTS
} from '../mutationTypes';

// initial state
const state = {
    list: []
};

// mutations
const mutations = {
    [LOAD_DEPARTMENTS] (state, departments) {
        state.list = departments;
    },
};

export default {
    state,
    mutations
};