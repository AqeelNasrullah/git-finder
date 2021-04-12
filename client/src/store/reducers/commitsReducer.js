import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    result: null
}

const commitsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.COMMITS_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.COMMITS_ERROR:
        return { ...state, loading: false, err: payload, result: null };

    case ActionTypes.COMMITS_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default commitsReducer;