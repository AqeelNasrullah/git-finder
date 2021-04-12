import * as ActionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    err: null,
    result: null
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.USER_LOADING:
        return { ...state, loading: true, err: null, result: null };

    case ActionTypes.USER_ERROR:
        return { ...state, loading: false, err: payload, result: null };

    case ActionTypes.USER_LOADED:
        return { ...state, loading: false, err: null, result: payload };

    default:
        return state
    }
}

export default userReducer;