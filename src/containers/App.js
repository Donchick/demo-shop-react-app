import React from 'react';
import Home from './Home';
import Login from './Login';
import { Router, Route } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';
import {history} from "../helpers/history";

const App = () => {
    return <div className="container">
        <Router history={history}>
            <div>
                <LoginGuardRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    </div>
};

export default App;