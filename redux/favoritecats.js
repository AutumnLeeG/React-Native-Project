import * as ActionTypes from './ActionTypes';

export const favoritecats = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITECAT:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

            case ActionTypes.DELETE_FAVORITECAT:
                return state.filter(favorite => favorite !== action.payload);

        default:
            return state;
    }
};