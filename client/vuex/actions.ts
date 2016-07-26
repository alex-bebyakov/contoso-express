import helper from '../helpers/uiHelper';
import * as types from './mutationTypes';
import * as _ from 'lodash';

export const getEntities = (store) => {
    const {dispatch, state} = store;

    dispatch(types.GET_ENTITIES, []);
};