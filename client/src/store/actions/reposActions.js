import axios from 'axios';
import * as ActionTypes from './actionTypes';

export const getRepos = param => dispatch => {
    dispatch({
        type: ActionTypes.REPOS_LOADING,
        payload: null
    });

    axios.get(`https://api.github.com/users/${param}/repos`)
        .then(result => {
            dispatch({
                type: ActionTypes.REPOS_LOADED,
                payload: result.data
            });
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.REPOS_ERROR,
                payload: err.message
            });
        });
}

export const getSingleRepo = (user, repo) => dispatch => {
    dispatch({
        type: ActionTypes.REPO_LOADING,
        payload: null
    });

    axios.get(`https://api.github.com/repos/${user}/${repo}`)
        .then(result => {
            dispatch({
                type: ActionTypes.REPO_LOADED,
                payload: result.data
            });
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.REPO_ERROR,
                payload: err.message
            });
        })
}

export const getCommits = (user, repo) => dispatch => {
    dispatch({
        type: ActionTypes.COMMITS_LOADING,
        payload: null
    });

    axios.get(`https://api.github.com/repos/${user}/${repo}/commits`)
        .then(result => {
            dispatch({
                type: ActionTypes.COMMITS_LOADED,
                payload: result.data
            })
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.COMMITS_ERROR,
                payload: err.message
            })
        })
}

export const getContributors = (user, repo) => dispatch => {
    dispatch({
        type: ActionTypes.CONTRIBUTORS_LOADING,
        paylaod: null
    });

    axios.get(`https://api.github.com/repos/${user}/${repo}/contributors`)
        .then(result => {
            dispatch({
                type: ActionTypes.CONTRIBUTORS_LOADED,
                payload: result.data
            })
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.CONTRIBUTORS_ERROR,
                payload: err.message
            })
        })
}

export const getLanguages = (user, repo) => dispatch => {
    dispatch({
        type: ActionTypes.LANGUAGES_LOADING,
        payload: null
    });

    axios.get(`https://api.github.com/repos/${user}/${repo}/languages`)
        .then(result => {
            dispatch({
                type: ActionTypes.LANGUAGES_LOADED,
                payload: result.data
            });
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.LANGUAGES_ERROR,
                payload: err.message
            })
        })
}