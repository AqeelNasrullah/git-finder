import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    repos: null
}

const singlRepoReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.REPO_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.REPO_ERROR:
        return { ...state, loading: false, err: payload, resul: null };

    case ActionTypes.REPO_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default singlRepoReducer;