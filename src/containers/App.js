import React from 'react';
import Home from './Home';
import Login from './Login';
import { Router, Route } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';
import {history} from "../helpers/history";
import { CommonLayout } from '../components/styled/common-layout';

const App = () => {
    return <Router history={history}>
            <CommonLayout>
                <LoginGuardRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </CommonLayout>
        </Router>
};

export default App;