import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    result: null
}

const contributorsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.CONTRIBUTORS_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.CONTRIBUTORS_ERROR:
        return { ...state, loading: false, err: payload, result: null };

    case ActionTypes.CONTRIBUTORS_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default contributorsReducer;