import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import { Router, Route } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';
import {history} from "../helpers/history";
import { CommonLayout } from '../components/styled/common-layout';
import connect from "react-redux/es/connect/connect";
import { logout } from '../actions/authentication';
import PropTypes from 'prop-types';
import authService from '../services/authentication';
import { Header, Footer, HeaderMenu, Main, BagIcon, LogoutIcon } from '../components/styled/app';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

class App extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        const user = authService.getUser();
        if (user) {
            this.setState({user: user});
        }
    }

    componentWillReceiveProps(nextState) {
        if (nextState.user) {
            this.setState({user: nextState.user});
        }
    }

    logout() {
        this.props.logout(this.state.user);
    }

    render () {
        return <Router history={history}>
            <CommonLayout>
                <Header>
                    <HeaderMenu>
                        <BagIcon/>
                        <span>Hello, <i>{this.state.user.login}</i></span>
                        <LogoutIcon onClick={this.logout.bind(this)}/>
                    </HeaderMenu>
                </Header>
                <Main>
                    <LoginGuardRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Main>
                <Footer>Copyright “Demo Shop”, 2017</Footer>
            </CommonLayout>
        </Router>
    }
}

App.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps, { logout }
)(App);