import axios from 'axios';
import qs from 'qs';
import {browserHistory} from 'react-router';
import {saveAuthData, authError} from '../utils/authService'

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

const ROOT_URL = "/api";

export function fetchPosts(redirectCallback) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/posts`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({type: FETCH_POSTS, payload: response});
            })
            .catch(() => redirectCallback())
    };
}

export function createPost(values, callback, redirectCallback) {

    return function (dispatch) {
        axios.post(`${ROOT_URL}/post`, qs.stringify(values), {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch ({type: CREATE_POST, payload: response});
                callback();
            })
            .catch(() => redirectCallback());
    };
}

export function fetchPost(postId, redirectCallback) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/post/${postId}`, {
            headers: {authorization: localStorage.getItem('token')}

        })
            .then(response => {
                dispatch ({type: FETCH_POST, payload: response});
            })
            .catch(() => redirectCallback());
    };
}

export function deletePost(postId, callback) {
    const request = axios.delete(`${ROOT_URL}/post/${postId}`, {
        headers: {authorization: localStorage.getItem('token')}
    }).then(() => callback());

    return {
        type: DELETE_POST,
        payload: postId
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
}
export function signinUser({email, password}, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signin`, qs.stringify({email, password}))
            .then(response => {

                dispatch({type: AUTH_USER});

                saveAuthData(response.data.token, email, response.data.role);
            })
            .then(() => callback())
            .catch(() => {
                dispatch(authError('Your login or password incorrect'));

            });
    };
}

export function signupUser({email, password}, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, qs.stringify({email, password}))
            .then(response => {
                dispatch({type: AUTH_USER});

                saveAuthData(response.data.token, email, 'user');
            })
            .then(() => callback())
            .catch(() => {
                dispatch(authError('Please try to signup with another email'));
            });
    }
}



