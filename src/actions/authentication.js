import authService from '../services/authentication';
import { USER_LOGGED_IN, LOGIN_FAILED } from '../constants/auth-actions';
import { history } from '../helpers/history';

const loginSuccess = user => ({
    type: USER_LOGGED_IN,
    user: user
});

const loginFailed = error => ({
    type: LOGIN_FAILED,
    error
});

export const login = (user) => dispatch => {
    return authService.login(user)
        .then(loginSuccess)
        .catch(loginFailed)
        .then(dispatch)
        .then(() => history.push('/'));
};