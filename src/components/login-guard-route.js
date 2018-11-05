import React from 'react';
import { Route, Redirect } from 'react-router';

const LoginAuthGuard = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user') ? <Component {...props}/> : <Redirect to='/login'/>
    )}/>
);

export default LoginAuthGuard;