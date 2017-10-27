import {isAuthenticated} from '../utils/authService'

import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER

} from '../actions';

const initialState = {authenticated: isAuthenticated()};

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };

    }

    return state;
}