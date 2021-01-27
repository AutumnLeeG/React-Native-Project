import * as ActionTypes from './ActionTypes';

export const cats = (state = {
            isLoading: true,
            errMess: null,
            cats: []
        }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CATS:
            return {...state, isLoading: false, errMess: null, cats: action.payload};

        case ActionTypes.CATS_LOADING:
            return {...state, isLoading: true, errMess: null, cats: []}

        case ActionTypes.CATS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};