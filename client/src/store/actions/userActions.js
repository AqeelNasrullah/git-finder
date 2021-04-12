import axios from 'axios'
import * as ActionTypes from './actionTypes'

export const getUsers = param => dispatch => {
    dispatch({
        type: ActionTypes.USER_LOADING,
        payload: null
    });

    axios.get(`https://api.github.com/users/${param}`)
        .then(result => {
            dispatch({
                type: ActionTypes.USER_LOADED,
                payload: result.data
            });
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.USER_ERROR,
                payload: err.message
            });
        })
}