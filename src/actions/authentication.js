import authService from '../services/authentication';
import { USER_LOGGED_IN, LOGIN_FAILED, LOGGED_OUT_FAILED } from '../constants/auth-actions';
import { history } from '../helpers/history';
import { PROCESS_WAS_FAILED } from '../constants/error';

const loginSuccess = user => ({
    type: USER_LOGGED_IN,
    user: user
});

const loginFailed = error => ({
    type: LOGIN_FAILED,
    error
});

const processFailed = (message) => ({
  type: PROCESS_WAS_FAILED,
  message
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
        .catch(() => processFailed('Logout failed.'))
        .then(dispatch);
};