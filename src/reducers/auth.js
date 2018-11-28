import { USER_LOGGED_IN,
         LOGIN_FAILED,
         USER_LOGGED_OUT,
         LOGIN_IN_PROCESS } from '../constants/auth-actions';

const auth = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                loginFailed: false,
                user: action.user,
                loginInProcess: false
            };

        case LOGIN_IN_PROCESS:
            return {
                loginFailed: false,
                loginInProcess: true
            };

        case LOGIN_FAILED:
            return {
                loginFailed: true,
                loginInProcess: false
            };

        case USER_LOGGED_OUT:
            return { user: null };

        default:
            return state
    }
};

export default auth;