import { USER_LOGGED_IN, LOGIN_FAILED, USER_RECEIVED, ROLE_RECEIVED } from '../constants/user-actions';

const user = (state = [], action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;

        case LOGIN_FAILED:
            return action.error;

        default:
            return state
    }
};

export default user;