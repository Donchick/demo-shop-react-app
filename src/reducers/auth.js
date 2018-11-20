import { USER_LOGGED_IN, LOGIN_FAILED, USER_LOGGED_OUT, LOGGED_OUT_FAILED } from '../constants/auth-actions';

const auth = (state = [], action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return { loginFailed: false, user: action.user };

        case LOGIN_FAILED:
            return { loginFailed: true };

        case USER_LOGGED_OUT:
            return { user: null };

        default:
            return state
    }
};

export default auth;