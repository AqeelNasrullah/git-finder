import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    repos: null
}

const reposReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.REPOS_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.REPOS_ERROR:
        return { ...state, loading: false, err: payload, resul: null };

    case ActionTypes.REPOS_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default reposReducer;