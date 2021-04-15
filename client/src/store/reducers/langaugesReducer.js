import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    result: null
};

const languagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.LANGUAGES_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.LANGUAGES_ERROR:
        return { ...state, loading: false, err: payload, result: null };

    case ActionTypes.LANGUAGES_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default languagesReducer;