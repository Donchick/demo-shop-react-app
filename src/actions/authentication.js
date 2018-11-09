import authService from '../services/authentication';
import { USER_LOGGED_IN, LOGIN_FAILED, LOGGED_OUT_FAILED } from '../constants/auth-actions';
import { history } from '../helpers/history';

const loginSuccess = user => ({
    type: USER_LOGGED_IN,
    user: user
});

const loginFailed = error => ({
    type: LOGIN_FAILED,
    error
});

const logoutFailed = error => ({
    type: LOGGED_OUT_FAILED,
    error
});

export const login = (user) => dispatch => {
    return authService.login(user)
        .then((user) => {
            dispatch(loginSuccess(user));
            history.push('/');
        })
        .catch((error) => {
            dispatch(loginFailed(error));
        });
};

export const logout = (user) => dispatch => {
    return authService.logout(user)
        .then(() => history.push('/'))
        .catch((error) => {
            dispatch(logoutFailed(error));
        });
};