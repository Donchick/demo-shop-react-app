import authService from '../services/auth';
import React from 'react';
import { Route, Redirect } from 'react-router';

const LoginAuthGuard = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        authService.isUserLoggedIn() ? <Component {...props}/> : <Redirect to='/login'/>
    )}/>
);

export default LoginAuthGuard;