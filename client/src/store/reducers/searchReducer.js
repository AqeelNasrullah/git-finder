import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    loading: true,
    err: null,
    search: null
};

const searchReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.SEARCH_LOADING:
        return { ...state, loading: true, err: null, search: null };

    case ActionTypes.SEARCH_ERROR:
        return { ...state, loading: false, err: payload, search: null };

    case ActionTypes.SEARCH_LOADED:
        return { ...state, loading: false, err: null, search: payload };

    default:
        return state
    }
}

export default searchReducer;