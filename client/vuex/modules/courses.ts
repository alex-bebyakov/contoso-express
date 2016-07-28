import {
    LOAD_COURSES,
    CHANGE_SELECTED_DEPARTMENT
} from '../mutationTypes';

// initial state
const state = {
    list: [],
    course: {},
    departmentId: ''
};

// mutations
const mutations = {
    [LOAD_COURSES] (state, courses) {
        state.list = courses;
    },
    [CHANGE_SELECTED_DEPARTMENT] (state, departmentId) {
        state.departmentId = departmentId;
    }
};

export default {
    state,
    mutations
};