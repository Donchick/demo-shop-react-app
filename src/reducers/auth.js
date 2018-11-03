import { USER_LOGGED_IN, LOGIN_FAILED } from '../constants/user-actions';

const user = (state = [], action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.userName;

        case LOGIN_FAILED:
            return action.error;

        default:
            return state
    }
};

export default user;