import authService from '../services/auth';
import { USER_LOGGED_IN, LOGIN_FAILED } from '../constants/user-actions';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const loginSuccess = user => ({
    type: USER_LOGGED_IN,
    userName: user.login
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
        .then(() => history.push('/'))
}