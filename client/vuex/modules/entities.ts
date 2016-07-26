import {
    GET_ENTITIES
} from '../mutationTypes';

// initial state
const state = {
    list: [],
    entity: {}
};

// mutations
const mutations = {
    [GET_ENTITIES] (state, entities) {
        state.list = entities;
    }
};

export default {
    state,
    mutations
};