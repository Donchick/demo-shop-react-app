import React from 'react';
import Home from './Home';
import Login from './Login';
import { Switch, Route } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';

const App = () => {
    return <div className="container">
        <Switch>
            <LoginGuardRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    </div>
};

export default App;