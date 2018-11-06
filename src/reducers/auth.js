import { USER_LOGGED_IN, LOGIN_FAILED } from '../constants/auth-actions';

const auth = (state = [], action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;

        case LOGIN_FAILED:
            return action.error;

        default:
            return state
    }
};

export default auth;