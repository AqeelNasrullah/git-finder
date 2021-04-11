import axios from "axios"
import * as ActionTypes from './actionTypes'

export const getSearchResult = param => dispatch => {
    axios.get(`https://api.github.com/search/users?q=${param}`)
        .then(result => {
            dispatch({
                type: ActionTypes.SEARCH_LOADED,
                payload: result.data
            })
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.SEARCH_ERROR,
                payload: err
            })
        });
}