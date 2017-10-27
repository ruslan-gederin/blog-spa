import {AUTH_ERROR} from '../actions';

export function saveAuthData(token, email, role) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', email);
    localStorage.setItem('role', role);
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function isAuthenticated() {
    return localStorage.getItem('token') ? true : false;
}

